import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createBrowserHistory } from 'history';

import Login from './containers/Login';
import Members from './containers/Members';
import './App.css';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props, context) {
    super(props);
  }

  componentWillMount() {
    this.setState({background: (Math.floor(Math.random() * 5) + 1)});

    let token = sessionStorage.getItem("access_token");

    if ( token !== null ) {
      history.push('/ironfist/members');
    } else {
      history.push('/ironfist/login');
    }
  }

  render() {
    let bodyClass = 'App bg-' + this.state.background;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={bodyClass}>
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