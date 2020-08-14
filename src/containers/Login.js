import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Dimmer, Loader, Button, Segment, Form, Grid, Header, Image, Message } from 'semantic-ui-react';
import bg from '../assets/images/stormwind.jpg';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      currentFilters: {},
      currentPage: 1,
      copies: [],
      totalCount: 0,
      totalPages: 1,
      loading: false,
      niceName: 'Members'
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
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Client ID' />
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Client Secret' type='password' />

                <Button fluid size='large'>Authenticate</Button>
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