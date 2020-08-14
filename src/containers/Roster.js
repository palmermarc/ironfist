import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Menu,Dimmer, Loader, Table, Button, Input, Icon } from 'semantic-ui-react';
import Ironfist from '../core/Ironfist';

class Roster extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
    this.filterStatus = this.filterStatus.bind(this);
    this.filterMarket = this.filterMarket.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.search = this.search.bind(this);
    this.timer = null;
  }

  getInitialState() {
    return {
      currentFilters: {},
      currentPage: 1,
      copies: [],
      totalCount: 0,
      totalPages: 1,
      loading: true,
      niceName: 'Members'
    }
  }

  componentWillMount() {
    // Call API
    this.getMembers();
  }

  componentDidMount() {
    document.title =  'Ironfist | Member List';
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

  filterMarket(e, {value}) {
    let currentFilters = Object.assign({}, this.state.currentFilters);

    if (value === 'any') {
      delete currentFilters['market'];

    } else {
      currentFilters['market'] = value;
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
    /**let self = this;
    Ironfist.get(
      'data/wow/guild/burning-legion/IRONFIST/roster',
      this.state.currentFilters,
      function(response) {
        console.log(response);
        if (response.data.success === true) {
          //self.setState({
          //  copies: response.data.results,
          //  totalCount: response.data.totalCount,
          //  totalPages: Math.ceil(response.data.totalCount / 100),
          //  loading: false
          //});
        }
      }
      ,function (err) {
        console.log("Error getting records from Ironfist API server: " + err);
      }
    );
   */
  }

  render() {
    let currentFilters = this.state.currentFilters;

    let {filterStatus, filterMarket, search} = this;

    if(this.state.loading)
      return (
        <Dimmer active inverted><Loader inverted content='Loading IRONFIST Roster' size="massive" /></Dimmer>
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

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Station</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Copy Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.copies.map((copy) => (
              <Table.Row key={'copy-'+copy.ID}>
                <Table.Cell>
                  <Link to={'/copy/edit/' + copy.ID + '/'}>{copy.name}</Link>
                </Table.Cell>
                <Table.Cell>{copy.station.name}</Table.Cell>
                <Table.Cell>{copy.start_date}</Table.Cell>
                <Table.Cell>{copy.end_date}</Table.Cell>
                <Table.Cell>{copy.type}</Table.Cell>
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
)(Roster));