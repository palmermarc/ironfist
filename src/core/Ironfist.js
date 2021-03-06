/* Get a new token: curl -u 96adc66832024326b62b6cf276723411:P3l9YKt6hhQr5HAcTXlWmBfL6DlHQdeI -d grant_type=client_credentials https://us.battle.net/oauth/token */

import axios from 'axios';
import config from '../constants/config';
import queryString from 'query-string';

class Ironfist {

  constructor() {
    this.config = config;
  }

  get( endpoint, query, callback, error ) {
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
        return false;
      });
    });
    return result;
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
              let key = 'member.' + member.server + '.' + member.name;
              sessionStorage.setItem(key.toLowerCase(), JSON.stringify(member));
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
    return new Promise((resolve, reject) => {
      let apiUrl = "https://raider.io/api/v1/characters/profile?region=us&realm=" + server + "&name=" + name + "&fields=gear,covenant,raid_progression,mythic_plus_scores_by_season:current,mythic_plus_ranks,mythic_plus_recent_runs,mythic_plus_best_runs,mythic_plus_highest_level_runs,mythic_plus_weekly_highest_level_runs,mythic_plus_previous_weekly_highest_level_runs,previous_mythic_plus_ranks,raid_achievement_curve:castle-nathria";
      this.get(
        apiUrl,
        {},
        function (response) {
          resolve(response.data);
        },function (err) {

        }
      );
    });
  }

}

export default new Ironfist();