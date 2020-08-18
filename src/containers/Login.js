import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, Segment, Form, Grid, Input } from 'semantic-ui-react';
import logo from "../logo.svg";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from "../constants/config";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.between = this.between.bind(this);

    this.updateMember = this.updateMember.bind(this);
  }

  getInitialState() {
    let bg = this.between(1,5);
    return {
      submitted: false,
      background: bg,
      client_id: config.client_id,
      client_secret: config.client_secret
    }
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  updateMember(member) {

  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {client_id, client_secret} = config;

    if (client_id && client_secret) {
      axios.get('https://us.battle.net/oauth/token', {
        auth: {
          username: this.state.client_id,
          password: this.state.client_secret
        },
        params: {
          grant_type: 'client_credentials'
        }
      } ).then((response) => {
        if( response.status === 200 ) {
          sessionStorage.setItem('access_token', response.data.access_token);
          this.props.history.push('/members/');
        }
      });
    }
  }

  render() {
    let bodyClass = 'login-wrapper wrap fade-in bg-' + this.state.background;

    return (
      <div className={bodyClass}>
        <div className="login-wrapper-overlay"></div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
                <img src={logo} className="login-logo" alt="logo" />
                <Form.Field>
                  <Input type="client_id" name="client_id" value={this.state.client_id} onChange={this.handleChange} placeholder="Client ID" />
                </Form.Field>
                <Form.Field>
                  <Input type="client_secret" name="client_secret" value={this.state.client_secret} onChange={this.handleChange} placeholder="Client Secret" />
                </Form.Field>

                <Form.Field fluid control={Button}>Authenticate</Form.Field>
              </Segment>
            </Form>
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