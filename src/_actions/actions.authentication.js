import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import Ironfist from '../core/Ironfist';

const history = createHistory();

function authLogout() {
  return {
    type: 'LOGOUT'
  };
};

function authLogin(user) {
  return {
    type: 'LOGIN',
    isAuthed: true,
    token: user.access_token
  }
};

export function authHasErrors(error) {
  return {
    type: 'LOGIN_HAS_ERRORS',
    loginError: error
  }
}

export function authenticateUser(username, password){
  let loginData = {
    username: username,
    password: password
  };

  return (dispatch) => {
    return axios.get('https://us.battle.net/oauth/token', {
      auth: loginData,
      params: {
        grant_type: 'client_credentials'
      }
    }).then((response) => {
      if( response.status === 200 ) {
        dispatch(authLogin(response.data));
      }
    }).catch((e) => {
      console.log(e);
      let response = JSON.parse(e.response.request.response);
      console.log(response);
      dispatch(authHasErrors("Error: Wrong Username/Password"));
    });

  }
}



export function userLogOut() {
  return (dispatch) => {
    dispatch(authLogout());
  }
}

export function checkToken() {

  return function (dispatch) {

    let url = 'users/validate';

    Ironfist.get(url, {}, function (response) {
      if( response.data.status === 'success' ) {
        sessionStorage.setItem('userId', response.data.id);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('first_name', response.data.first_name);
        sessionStorage.setItem('last_name', response.data.last_name);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('phone', response.data.phone);
        dispatch(authLogin(response.data.id));
      } else {
        dispatch(authHasErrors(response.data.message));
        dispatch(userLogOut());
        history.push('/login/');
      }
    },function(e) {
      dispatch(authHasErrors(e.response.data.message));
      dispatch(userLogOut());
      history.push('/login/');
    });
  };

}