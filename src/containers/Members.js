import React from 'react';
import { withRouter } from 'react-router';
import { Table, Image, Icon } from 'semantic-ui-react';

class Members extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      members: [],
      sortBy: 'item_level',
      sortDirection: 'DESC',
      loading: false,
      niceName: 'Guild Members'
    } ;

    this.getMembers = this.getMembers.bind(this);
    this.updateSortBy = this.updateSortBy.bind(this);
  }

  componentDidMount() {
    this.getMembers();
  }

  updateSortBy(newSortBy) {
    this.setState({sortBy: newSortBy})
  }

  getMembers() {
    let guildRoster = sessionStorage.getItem('members');
    let members = [];

    guildRoster = JSON.parse(guildRoster);

    guildRoster.forEach((member) => {
      let memberKey = 'member.' + member.server + '.' +  member.name.toLowerCase();
      let memberData = sessionStorage.getItem(memberKey);
      memberData = JSON.parse(memberData);
      members.push(memberData);
    });

    let sortBy = this.state.sortBy || 'item_level';

    members.sort((a,b) => {
      if( a[sortBy] > b[sortBy] ) {
        return -1;
      }

      if( a[sortBy] < b[sortBy] ) {
        return 1;
      }

      return 0;
    });

    this.setState({members: members})
  }

  render() {
    return (
      <div className="wrap fade-in">
        <Table celled striped selectable className="members-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Item Level</Table.HeaderCell>
              <Table.HeaderCell>Raider.IO Score</Table.HeaderCell>
              <Table.HeaderCell>AOTC</Table.HeaderCell>
              <Table.HeaderCell>Necrotic Wake</Table.HeaderCell>
              <Table.HeaderCell>Plaguefall</Table.HeaderCell>
              <Table.HeaderCell>Mists of Tirna Scithe</Table.HeaderCell>
              <Table.HeaderCell>Halls of Atonement</Table.HeaderCell>
              <Table.HeaderCell>De Other Side</Table.HeaderCell>
              <Table.HeaderCell>Sanguine Depths</Table.HeaderCell>
              <Table.HeaderCell>Spires of Ascension</Table.HeaderCell>
              <Table.HeaderCell>Theater of Pain</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.members.map((member) => (
              <Table.Row key={'member-' + member.id}>
                <Table.Cell className='member-name'>
                  <Image src={member.playable_class.icon} avatar /> {member.name}-{member.server.replace('-', ' ')}
                </Table.Cell>
                <Table.Cell className='member-level'>{member.item_level}</Table.Cell>
                <Table.Cell className='member-level'>{Math.ceil(member.raiderio_score)}</Table.Cell>

                <Table.Cell className='member-level'>
                  <Icon name='times circle' color='red' />
                </Table.Cell>

                <Table.Cell className='member-level'>{member.mythicPlus.NW.upgradeString}{member.mythicPlus.NW.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.PF.upgradeString}{member.mythicPlus.PF.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.MISTS.upgradeString}{member.mythicPlus.MISTS.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.HOA.upgradeString}{member.mythicPlus.HOA.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.DOS.upgradeString}{member.mythicPlus.DOS.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.SD.upgradeString}{member.mythicPlus.SD.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.SOA.upgradeString}{member.mythicPlus.SOA.highestKey}</Table.Cell>
                <Table.Cell className='member-level'>{member.mythicPlus.TOP.upgradeString}{member.mythicPlus.TOP.highestKey}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default withRouter(Members);
