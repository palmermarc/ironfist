import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from "./_actions/actions.authentication";
import {bindActionCreators} from "redux";
import { createBrowserHistory } from 'history';

import SiteHeader from './containers/SiteHeader';
import Members from './containers/Members';
import Member from './containers/Member';
import Login from './containers/Login';
import AheadOfTheCurve from './containers/AheadOfTheCurve';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props, context) {
    super(props);
  }

  componentWillMount() {
    let token = sessionStorage.getItem("access_token");

    if ( token !== null ) {
      history.push('/members/');
    } else {
      history.push('/login/');
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SiteHeader />
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/members/:serverName/:memberName" component={Member} />
            <Route path="/members" component={Members} />
            <Route path="/ahead-of-the-curve" component={AheadOfTheCurve} />
          </Switch>
        </div>
      </Router>
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