import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {Dimmer, Image, Loader, Table} from 'semantic-ui-react';
import config from '../constants/config';
import Ironfist from '../core/Ironfist';

class Member extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      niceName: 'Guild Member',
      member: {
        achievement_points: 0,
        active_spec: 62,
        active_title: '',
        average_item_level: 0,
        playableClass: 1,
        equipped_item_level: '',
        id: 0,
        last_login_timestamp: '',
        level: 0,
        name: '',
        race: 0,
      }
    }
  }

  componentDidMount() {
    if( typeof this.props.match.params.memberName !== "undefined" ) {
      this.setState({ memberName: this.props.match.params.memberName });
    }

    if( typeof this.props.match.params.serverName !== "undefined" ) {
      this.setState({ serverName: this.props.match.params.serverName });
    }

    this.getMember();

    document.title = this.state.niceName;
  }

  getMember() {
    let memberResponse = Ironfist.getMember(this.props.match.params.serverName, this.props.match.params.memberName);
    console.log('----------');
    console.log(memberResponse);
    console.log('----------');
    this.setState({member: memberResponse, loading: false});
  }

  render() {
    //let races = config.races;
    //let specs = config.specs;

    let classes = config.classes;

    if(this.state.loading) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading Member' size="massive"/>
        </Dimmer>
      )
    }

    console.log(this.state);

    return (
      <div className="member-breakout wrap fade-in">
        <div id="view-header-section">
          <h1>{this.state.memberName} <Image src={classes.[this.state.member.playableClass].icon} /></h1>
          <div className='member-ancillary-crap'>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Level</Table.HeaderCell>
                  <Table.HeaderCell>Item Level</Table.HeaderCell>
                  <Table.HeaderCell>Achievement Points</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{this.state.member.level}</Table.Cell>
                  <Table.Cell>{this.state.member.average_item_level}</Table.Cell>
                  <Table.Cell>{this.state.member.achievement_points}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Member));