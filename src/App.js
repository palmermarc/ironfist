import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import {withRouter} from "react-router";
import * as actions from "./_actions/actions.authentication";
import {bindActionCreators} from "redux";
import { createBrowserHistory } from 'history'

import SiteHeader from './containers/SiteHeader';
import Roster from './containers/Roster';
import Login from './containers/Login';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="App">
        <SiteHeader />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" compoent={Roster} />
          </Switch>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);