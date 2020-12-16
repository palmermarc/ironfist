import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, Segment, Grid } from 'semantic-ui-react';
import logo from "../logo.svg";
import Ironfist from "../core/Ironfist";
import axios from 'axios';
import config from "../constants/config";


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();

    this.handleClick = this.handleClick.bind(this);
    this.between = this.between.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getInitialState() {
    let bg = this.between(1,5);
    await this.getAccessToken();
    return {
      background: bg,
      viewEnabled: false
    }
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  async getAccessToken() {
    axios.get('https://us.battle.net/oauth/token', {
      auth: {
        username: config.client_id,
        password: config.client_secret
      },
      params: {
        grant_type: 'client_credentials'
      }
    } ).then((response) => {
      if( response.status === 200 ) {
        sessionStorage.setItem('access_token', response.data.access_token);
      } else {
        console.log(response);
      }
    });
  }

  async handleClick(e) {
    let self = this;
    await this.getAccessToken();
    await Ironfist.getIronfistMembers();

    this.setState({loading: true});
    setTimeout(function() {
      //self.props.history.push('/members/');
    }, 1500);

  }

  render() {
    let bodyClass = 'login-wrapper wrap fade-in bg-' + this.state.background;

    return (
      <div className={bodyClass}>
        <div className="login-wrapper-overlay"></div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment stacked>
              <img src={logo} className="login-logo" alt="logo" />

              <Button attached='bottom' content='Load the Roster' onClick={this.handleClick} />
            </Segment>
          </Grid.Column>
        </Grid>
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
)(Login));