import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Dimmer, Loader, Table } from 'semantic-ui-react';
import config from '../constants/config';
import Ironfist from '../core/Ironfist';

class Member extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      memberName: "",
      loading: true,
      niceName: 'Guild Member'
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
    this.setState({loading: false});
  }

  getMember() {
    let member = Ironfist.getMember(this.props.match.params.serverName, this.props.match.params.memberName);
    console.log(member);
  }

  render() {
    let races = config.races;
    let classes = config.classes;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading Member' size="massive" /></Dimmer>
      )

    console.log(this.state);

    return (
      <div className="member-breakout wrap fade-in">
        <div id="view-header-section">
          <h1>{this.state.memberName}</h1>
          <div className='member-ancillary-crap'>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Mounts</Table.HeaderCell>
                  <Table.HeaderCell>Pets</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
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

/**
 <Table celled selectable className="Member-table">
 <Table.Header>
 <Table.Row>
 <Table.HeaderCell>Name</Table.HeaderCell>
 <Table.HeaderCell>Race</Table.HeaderCell>
 <Table.HeaderCell>Class</Table.HeaderCell>
 <Table.HeaderCell>Level</Table.HeaderCell>
 <Table.HeaderCell>Guild Rank</Table.HeaderCell>
 </Table.Row>
 </Table.Header>
 <Table.Body>
 {this.state.Member.map((member) => (
              <Table.Row key={'member-' + member.character.id}>
                <Table.Cell>
                  <Link to={'/member/' + member.character.id + '/'}>{member.character.name}</Link>
                </Table.Cell>
                <Table.Cell>{races.[member.character.playable_race.id]}</Table.Cell>
                <Table.Cell className='member-class-icon'><Image src={classes.[member.character.playable_class.id].icon} /></Table.Cell>
                <Table.Cell>{member.character.level}</Table.Cell>
                <Table.Cell>{member.rank}</Table.Cell>
              </Table.Row>
            ))}
 </Table.Body>
 </Table>
 */