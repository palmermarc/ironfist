import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, Segment, Form, Grid, Input } from 'semantic-ui-react';
import bg from '../assets/images/stormwind.jpg';
import logo from "../logo.svg";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    return {
      client_id: '',
      client_secret: '',
      submitted: false,
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
    const {username, password} = this.state;
    if (username && password) {
      this.props.actions.authenticateUser(username, password);
    }
  }

  componentDidMount() {
    document.title =  'Ironfist | Member List';
    this.setState({loading: false});
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getInitialState());
  }

  render() {
    return (
      <div className="login-wrapper wrap fade-in" styles={{backgroundImage: `url(${bg})`}}>
        <div class="login-wrapper-overlay"></div>
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

                <Form.Field fluid control={Button}>Login</Form.Field>
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