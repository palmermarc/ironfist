import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Table, Image } from 'semantic-ui-react';

class Members extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.getMembers = this.getMembers.bind(this);
  }

  getInitialState() {
    let members = this.getMembers();
    document.title =  'Member List | IRONFIST Members Manager';
    return {
      members: members,
      loading: false,
      niceName: 'Guild Members'
    }
  }

  getMembers() {
    let guildRoster = sessionStorage.getItem('members');
    guildRoster = JSON.parse(guildRoster);
    let members = [];
    guildRoster.forEach((member) => {
      let memberKey = 'member.' + member.server + '.' +  member.name.toLowerCase();
      let memberData = sessionStorage.getItem(memberKey);
      memberData = JSON.parse(memberData);
      members.push(memberData)
    })

    return members;
  }

  render() {

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
              <Table.HeaderCell>Race</Table.HeaderCell>
              <Table.HeaderCell>Item Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.members.map((member) => (
              <Table.Row key={'member-' + member.id}>
                <Table.Cell className='member-name'>
                  <Link to={'/members/' + member.id}><Image src={member.playable_class.icon} avatar /> {member.name} - {member.server}</Link>
                </Table.Cell>

                <Table.Cell className='member-race'>{member.playable_race}</Table.Cell>
                <Table.Cell className='member-level'>{member.item_level}</Table.Cell>
              </Table.Row>
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
)(Members));