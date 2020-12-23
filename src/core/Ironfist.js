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
    let config = {};

    if( url.indexOf('https://raider.io') === -1 ) {
      let token = sessionStorage.getItem('access_token');
      config = {
        headers: {"Authorization": "Bearer " + token}
      };
    } else {
      config = {
        headers: {'accept': 'application/json' }
      }
    }


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
    this.get(url, {}, function(response) {

      member.achievement_points = response.data.achievement_points;
      member.active_spec = response.data.active_spec.id;
      member.active_title = response.data.active_title.display_string.en_US.replace('{name}', '');
      member.average_item_level = response.data.average_item_level;
      member.playableClass = response.data.character_class.id;
      member.equipped_item_level = response.data.equipped_item_level;
      member.id = response.data.id;
      member.last_login_timestamp = response.data.last_login_timestamp;
      member.level = response.data.level;
      member.name = response.data.name;
      member.race = response.data.race.id;

      return member;
    });
    return member;
  }

  async createDatabase() {
    let db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);

    db.transaction(function (tx) {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS members (id unique PRIMARY KEY , name, server, server_id INTEGER, level, class INTEGER, race INTEGER, average_item_level INTEGER, guild_rank)',
        [],
      );
      //tx.executeSql( 'TRUNCATE TABLE members');

      //tx.executeSql( 'CREATE TABLE IF NOT EXISTS pvp_ratings (member_id unique, two_v_two, three_v_three, five_v_five)' );
      //tx.executeSql( 'CREATE TABLE IF NOT EXISTS ahead_of_the_curve (member_id unique, castle_nathria, shadowlands_raid_2, shadowlands_raid_3, shadowlands_raid_4, shadowlands_raid_5' );
      //tx.executeSql( 'CREATE TABLE IF NOT EXISTS mythic_plus (id unique, member_id, dungeon_name, key_level, did_in_time)' );
      //tx.executeSql( 'TRUNCATE TABLE pvp_ratings');
      //tx.executeSql( 'TRUNCATE TABLE ahead_of_the_curve');
      //tx.executeSql( 'TRUNCATE TABLE mythic_plus');
    });
  }

   async saveCharacter(characterData) {
    let self = this;
    let character = characterData.character;

    let db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);

    db.transaction(function (tx) {
      console.log(tx);
      console.log('Made it in here!');
      let race = config.races[character.playable_race.id];
      let characterClass = config.classes[character.playable_class.id].name;
      let data = [character.id, character.name, character.realm.slug, character.realm.id, character.level, characterClass, race, 0, characterData.rank];
      console.log(data);

      tx.executeSql(
        'INSERT INTO members (id, name, server, server_id, level, class, race, average_item_level, guild_rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        data,
        function (txt, response) {
          console.log(txt);
          console.log(response);
          //self.getMemberRaiderIO(character.server, character.name);
        },
        function (txt, response) {
          console.log(txt);
          console.log(response);
        }
      );
    });
  }

  getIronfistMembers() {
    let self = this;
    return new Promise((resolve, reject) => {
      let trackingRanks = [0, 1, 2, 4, 5];

      // Didn't exist, time to get to work!
      self.get(
        config.apiLinks.guild.roster,
        {},
        function(response) {
          let members = [];

          response.data.members.forEach((memberData) => {
            let member = {
              id: memberData.character.id,
              name: memberData.character.name,
              server: memberData.character.realm.slug,
              rank: memberData.rank,
              level: memberData.character.level,
              playable_race: config.races[memberData.character.playable_race.id],
              playable_class: config.classes[memberData.character.playable_class.id],
            };

            if( member.level === 60 && trackingRanks.includes(member.rank)) {
              members.push(member);
            }
          });

          resolve(members);
        }
        ,function (err) {
          console.log("Error getting records from Ironfist API server: " + err);
        }
      );
    })

  }

  getMemberRaiderIO(server, name) {
    let apiurl = "https://raider.io/api/v1/characters/profile?region=us&realm=" + server + "&name=" + name + "&fields=gear,covenant,raid_progression,mythic_plus_scores_by_season:current,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_best_runs,mythic_plus_highest_level_runs,mythic_plus_weekly_highest_level_runs,mythic_plus_previous_weekly_highest_level_runs,previous_mythic_plus_ranks,raid_achievement_curve:castle-nathria";
    this.get(
      apiurl,
      {},
      function(response) {
        console.log(response);
      }, function(err) {
        console.log('Error retrieving raider.io data.');
      }
    );
  }

  loadRaiders() {
    let db = openDatabase(config.database.name, config.database.version, config.database.description, config.database.size);
    let members = [];
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM members ORDER BY guild_rank DESC',
        [],
        function (txt, response) {
          for (let i = 0; i < response.rows.length; i++) {
            members.push(response.rows.item(i));
          }

          return members;
        },
        function(txt, response) {}
      );
    });
  }
}

export default new Ironfist();