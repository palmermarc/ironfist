import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';

import Login from './containers/Login';
import Members from './containers/Members';
//import Member from './containers/Member';
//import AheadOfTheCurve from './containers/AheadOfTheCurve';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props, context) {
    super(props);
  }

  async componentWillMount() {
    let token = sessionStorage.getItem("access_token");

    if ( token !== null ) {
      history.push('/ironfist/members');
    } else {
      history.push('/ironfist/login');
    }
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/members" component={Members} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;