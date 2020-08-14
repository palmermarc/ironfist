import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from "./_actions/actions.authentication";
import {bindActionCreators} from "redux";
import { createBrowserHistory } from 'history'

import SiteHeader from './containers/SiteHeader';
//import Roster from './containers/Roster';
import Login from './containers/Login';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props, context) {
    super(props);
  }

  componentWillMount() {
    let token = sessionStorage.getItem("marcoPromoToken");

    if ( token !== null ) {
      console.log('We need to check the token...');
      //this.props.actions.checkToken(token);
    } else {
      history.push('/login/');
    }
  }



  render() {
    return (
      <div className="App">
        <SiteHeader />
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
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