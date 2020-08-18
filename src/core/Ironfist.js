/* Get a new token: curl -u 96adc66832024326b62b6cf276723411:P3l9YKt6hhQr5HAcTXlWmBfL6DlHQdeI -d grant_type=client_credentials https://us.battle.net/oauth/token */

import axios from 'axios';
import config from '../constants/config';
import queryString from 'query-string';

class Ironfist {

  constructor() {
    this.config = config;
  }

  get( endpoint, query, callback, error ) {

    let self = this;

    let url = endpoint + ( query !== {} ? '' + queryString.stringify(query) : '' );
    let token = sessionStorage.getItem('access_token');
    let config = {
      headers: {"Authorization": "Bearer " + token}
    };

    let result = new Promise(resolve => {
      let r = resolve;
      axios.get(url, config).then(function (response) {

        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch(function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint": endpoint,
              "Method": "GET",
              "Query": query,
            }
          );
        }
        return false;
      });
    });
    return result;
  }

  post( endpoint, data, callback, error ) {

    let self = this;

    let url = this.config.apiBase + endpoint;
    let config = {
      headers: {"Authorization": "Bearer USww3PVEUWV8AjyO47JMjEJvl9E9IO3bN2"},
      data: data
    };

    let result = new Promise(resolve => {
      let r = resolve;
      axios.post(url,config).then( function(response) {

        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch( function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint" : endpoint,
              "Method" : "POST",
              "Data" : data,
              "Error" : err.response
            }
          );
        }
        r(false);
      });
    });

    return result;
  }

  put( endpoint, data, callback, error ) {

    let self = this;


    let url = this.config.apiBase + endpoint;
    let config = {
      headers: {"Authorization" : "Bearer " + sessionStorage.getItem("marcoPromoToken")},
      ...data
    };

    let result = new Promise(resolve => {
      let r = resolve;
      axios.put(url,config).then( function(response) {

        if (typeof callback === "function") {
          callback(response);
        }
        r(true);
      }).catch( function(err) {

        if (typeof error === "function") {
          error(err);
        } else {
          self.log(
            "error",
            {
              "Description": "API Error",
              "Endpoint" : endpoint,
              "Method" : "POST",
              "Data" : data,
              "Error" : err.response
            }
          );
        }
        r(false);
      });
    });

    return result;
  }

  log(action, data = '', target = null, user = null) {

    let logData = {
      action,
      data,
      target,
      user
    };

    console.log(logData);

    //this.post('log/write', logData);
  }

  event(action, data = '', target = null, user = null) {

    //this.log(action, data, target, user);
    this.sendMail(action, data, target, user);
  }

  error(message, target, user) {
    this.log("error", message, target, user);
  }


  redirect(path) {
    //browserHistory.push(path);
  }

  getMember(server, character_name) {
    let member = {};
    let url = 'https://us.api.blizzard.com/profile/wow/character/' + server + '/' + character_name + '?namespace=profile-us';
    this.get(url, {},
      function(response) {
        console.log(response);
        member.response = response;
      });

    return member;
  }
}

export default new Ironfist();