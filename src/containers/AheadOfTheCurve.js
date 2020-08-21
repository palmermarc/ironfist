import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Table, Input, Icon } from 'semantic-ui-react';
import config from '../constants/config';
import Ironfist from '../core/Ironfist';

function DisplayAotc(props) {
  if(!props.memberData) {
    return;
  }

  let member = props.memberData;
  let level = member.character.level;
  //check circle
  //times circle

  if( level === 120 ) {
    member.achievements = {
      aotc: {
        ghuun: false,
        jaina: false,
        uunat: false,
        azhsara: false,
        nzoth: true
      }
    };

    return(
      <Table.Row key={'member-' + member.character.id}>
        <Table.Cell className='member-name'>{member.character.name} - {member.character.realm.slug.replace('-', ' ')}</Table.Cell>
        <Table.Cell>{member.achievements.aotc.ghuun ? <Icon color="green" name='check circle' /> : <Icon color="red" name='times circle' /> }</Table.Cell>
        <Table.Cell>{member.achievements.aotc.jaina ? <Icon color="green" name='check circle' /> : <Icon color="red" name='times circle' /> }</Table.Cell>
        <Table.Cell>{member.achievements.aotc.uunat ? <Icon color="green" name='check circle' /> : <Icon color="red" name='times circle' /> }</Table.Cell>
        <Table.Cell>{member.achievements.aotc.azhsara ? <Icon color="green" name='check circle' /> : <Icon color="red" name='times circle' /> }</Table.Cell>
        <Table.Cell>{member.achievements.aotc.nzoth ? <Icon color="green" name='check circle' /> : <Icon color="red" name='times circle' /> }</Table.Cell>
      </Table.Row>
    );
  }

  return(
    <Table.Row></Table.Row>
  )

}

class AheadOfTheCurve extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      currentFilters: {},
      currentPage: 1,
      members: [],
      totalCount: 0,
      totalPages: 1,
      loading: true,
      niceName: 'Guild Members'
    }
  }


  componentDidMount() {
    document.title =  'Member List | IRONFIST Members Manager';
    this.setState({members: Ironfist.getIronfistMembers(), loading: false});
  }

  render() {
    let {search} = this;
    let races = config.races;
    let classes = config.classes;
    let ranks = config.ranks;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading IRONFIST Members' size="massive" /></Dimmer>
      )

    return (
      <div className="wrap fade-in">
        <Table celled selectable className="members-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>G'huun</Table.HeaderCell>
              <Table.HeaderCell>Jaina</Table.HeaderCell>
              <Table.HeaderCell>Uu'nat</Table.HeaderCell>
              <Table.HeaderCell>Queen Azshara</Table.HeaderCell>
              <Table.HeaderCell>N'Zoth</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.members.map((member) => (
              <DisplayAotc memberData={member} />
            ))}
          </Table.Body>
        </Table>
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
)(AheadOfTheCurve));