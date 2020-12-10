import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Button, Segment, Grid } from 'semantic-ui-react';
import logo from "../logo.svg";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getInitialState();

    this.handleClick = this.handleClick.bind(this);
    this.between = this.between.bind(this);
  }

  getInitialState() {
    let bg = this.between(1,5);
    return {
      submitted: false,
      background: bg,
    }
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  handleClick(e) {
    this.props.history.push('/members/');
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

              <Button attached='bottom' content='View the Roster' onClick={this.handleClick} />
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