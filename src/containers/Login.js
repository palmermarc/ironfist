import React from 'react';
import { withRouter } from 'react-router'
import { Dimmer, Loader, Button, Segment, Grid } from 'semantic-ui-react';
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
    return {
      loading: false,
      viewEnabled: false
    }
  }

  between(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
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
          resolve(response.data);
        } else {
          reject(response);
        }
      });
    })
  }

  async handleClick(e) {
    let self = this;

    this.setState({loading: true});

    await this.getAccessToken();

    let memberRequests = [];
    let members = await Ironfist.getIronfistMembers();
    sessionStorage.setItem('members', JSON.stringify(members));

    members.forEach((member) => {
      memberRequests.push(Ironfist.getMemberRaiderIO(member.server, member.name));
    });

    Promise.all(memberRequests).then((allMemberData) => {
      allMemberData.forEach((memberData) => {
        let realm = memberData.realm;
        realm = realm.toLowerCase();
        realm = realm.replace(' ', '-');
        let memberKey = 'member.' + realm + '.' + memberData.name.toLowerCase();
        let savedMemberData = sessionStorage.getItem(memberKey);
        savedMemberData = JSON.parse(savedMemberData);

        savedMemberData.achievement_points = memberData.achievement_points;
        savedMemberData.covenant = memberData.covenant.name;
        savedMemberData.renown = memberData.covenant.renown_level;
        savedMemberData.item_level = memberData.gear.item_level_equipped;
        savedMemberData.raiderio_score = memberData.mythic_plus_scores_by_season[0].scores.all;

        let mythicPlus = {
          MISTS: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          TOP: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          SD: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          SOA: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          PF: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          NW: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          DOS: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
          HOA: { inTime: 0, highestKey: 0, num_key_upgrades: 0 },
        }

        memberData.mythic_plus_best_runs.forEach((mplusRun) => {
          let upgrade_string = "";

          if( mplusRun.num_keystone_upgrades === 1) {
            upgrade_string = "+";
          } else if( mplusRun.num_keystone_upgrades === 2) {
            upgrade_string = "++";
          } else if( mplusRun.num_keystone_upgrades === 3) {
            upgrade_string = "+++";
          }

          mythicPlus[mplusRun.short_name] = {
            highestKey: mplusRun.mythic_level,
            inTime: (mplusRun.num_keystone_upgrades === 0 ) ? 0 : 1,
            upgradeString: upgrade_string,
            numberKeyUpgrades: mplusRun.num_key_upgrades
          }
        });

        savedMemberData.mythicPlus = mythicPlus;

        sessionStorage.setItem(memberKey, JSON.stringify(savedMemberData));
      });
    })

    setTimeout(function() {
      self.props.history.push('/members/');
    }, 1500);

  }

  render() {
    let bodyClass = 'login-wrapper wrap fade-in';
    let isLoading = this.state.loading;

    return (
      <div className={bodyClass}>
        <div className="login-wrapper-overlay"></div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Segment stacked>
              {isLoading ? (
                <Dimmer active inverted>
                  <Loader inverted content='Loading Member Data...' />
                </Dimmer>
              ) : (
                <div>
                  <img src={logo} className="login-logo" alt="logo" />

                  <Button attached='bottom' content='Load the Roster' onClick={this.handleClick} />
                </div>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Login);