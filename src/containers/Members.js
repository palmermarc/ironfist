import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Table, Input, Image } from 'semantic-ui-react';
import config from '../constants/config';
//import Ironfist from '../core/Ironfist';

class Members extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.loadMembers = this.loadMembers.bind(this);
  }

  getInitialState() {
    return {
      members: [],
      loading: true,
      niceName: 'Guild Members'
    }
  }

  componentDidMount() {
    document.title =  'Member List | IRONFIST Members Manager';

    this.loadMembers();
  }

  async loadMembers() {
    console.log('Trying to load members');
    let db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
    let self = this;
    let characters = [];
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM members ORDER BY guild_rank DESC',
        [],
        function (txt, response) {
          console.log(txt);
          console.log(response);
          for (let i = 0; i < response.rows.length; i++) {
            characters.push(response.rows.item(i));
          }
          console.log(characters);

          self.setState({members: characters, loading: false});
        },
        function(txt, response) {
          console.log(response);
        }
      );
    });
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
              <Table.HeaderCell>Class</Table.HeaderCell>
              <Table.HeaderCell>Item Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.members.map((member) => (
              <Table.Row key={'member-' + member.id}>
                <Table.Cell className='member-name'>
                  <Link to={'/members/' + member.id}>{member.name} - {member.server}</Link>
                </Table.Cell>

                <Table.Cell className='member-race'>{member.race}</Table.Cell>
                <Table.Cell className='member-class'>{member.class}</Table.Cell>
                <Table.Cell className='member-level'>{member.average_item_level}</Table.Cell>
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