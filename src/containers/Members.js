import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Table, Button, Input, Icon, Image } from 'semantic-ui-react';
import Ironfist from '../core/Ironfist';
import config from '../constants/config';

class Members extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.filterStatus = this.filterStatus.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.search = this.search.bind(this);
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

  componentWillMount() {
    // Call API
    this.getMembers();
  }

  componentDidMount() {
    document.title =  'Member List | IRONFIST Members Manager';
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialState(), this.getMembers);
  }

  clearFilters() {
    this.setState(
      {
        currentFilters: []
      },
      this.getMembers
    );
  }

  filterStatus(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['status'];

    } else {
      currentFilters['status'] = value;
    }

    this.setState({currentFilters: currentFilters}, this.getMembers);
  }

  filterSearch(value) {
    this.setState({currentFilters: {"search": value}}, this.getMembers);
  }

  search(e) {
    e.persist();
    let filterSearch = this.filterSearch;
    filterSearch(e.target.value);
  }

  getMembers() {
    let self = this;
    Ironfist.get( config.apiLinks.guild.roster,
      this.state.currentFilters,
      function(response) {
        self.setState( { members: response.data.members, loading: false } );
      }
      ,function (err) {
        console.log("Error getting records from Ironfist API server: " + err);
      }
    );
  }

  render() {
    let currentFilters = this.state.currentFilters;

    let {search} = this;
    console.log(this.state);
    let races = config.races;
    let classes = config.classes;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading IRONFIST Members' size="massive" /></Dimmer>
      )

    return (
      <div className="wrap fade-in">
        <div id="view-header-section">
          <h1 className="view-title">{this.state.niceName}</h1>
          <Button as={Link} to={'/copy/create'} className="view-create-new">
            <Icon name="plus" />
            Create New
          </Button>

          <div className="view-filters"></div>

          <div className="view-search">
            <Input placeholder={"Search " + this.state.niceName  + '...'} onKeyUp={search} />
          </div>
        </div>

        <Table celled selectable className="members-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Race</Table.HeaderCell>
              <Table.HeaderCell>Class</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.members.map((member) => (
              <Table.Row key={'member-' + member.character.id}>
                <Table.Cell>
                  <Link to={'/member/' + member.character.id + '/'}>{member.character.name}</Link>
                </Table.Cell>
                <Table.Cell>{races.[member.character.playable_race.id]}</Table.Cell>
                <Table.Cell className='member-class-icon'><Image src={classes.[member.character.playable_class.id].icon} /></Table.Cell>
                <Table.Cell>{member.character.level}</Table.Cell>
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