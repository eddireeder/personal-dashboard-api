import React from 'react';
import './Sport.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Sport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      availableTeams: [],
      chosenTeam: null,
      beatenTeams: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async getAvailableTeams() {
    try {
      const {data} = await axios.get('/sport/teams');
      let state = {...this.state};
      state.availableTeams = data;
      this.setState(state);
    } catch (e) {
      // Log out if unauthorized
      if (e.response.status === 401) {
        localStorage.removeItem('user');
        this.setState({
          loggedIn: false,
        });
      }
    }
  }

  async getChosenTeam(team) {
    try {
      const {data} = await axios.get('/auth/profile');
      let state = {...this.state};
      state.chosenTeam = data.team;
      this.setState(state);
    } catch (e) {
      // Log out if unauthorized
      if (e.response.status === 401) {
        localStorage.removeItem('user');
        this.setState({
          loggedIn: false,
        });
      }
    }
  }

  async updateChosenTeam(team) {
    try {
      let state = {...this.state};
      state.chosenTeam = team;
      this.setState(state);
      await axios.post('/sport/team', {team: team});
    } catch (e) {
      // Log out if unauthorized
      if (e.response.status === 401) {
        localStorage.removeItem('user');
        this.setState({
          loggedIn: false,
        });
      }
    }
  }

  async getBeatenTeams() {
    try {
      const {data} = await axios.get('/sport/wins');
      let state = {...this.state};
      state.beatenTeams = data;
      this.setState(state);
    } catch (e) {
      // Log out if unauthorized
      if (e.response.status === 401) {
        localStorage.removeItem('user');
        this.setState({
          loggedIn: false,
        });
      }
    }
  }

  componentDidMount() {
    this.getChosenTeam();
    this.getAvailableTeams();
    this.getBeatenTeams();
  }

  async handleChange(event) {
    await this.updateChosenTeam(event.target.value);
    await this.getBeatenTeams();
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to='/'></Redirect>;
    }
    return (
      <div className="Sport">
        <div className="header">Sport</div>
        <select value={this.state.chosenTeam ? this.state.chosenTeam : ""} onChange={this.handleChange}>
          <option value="" disabled>Select a team</option>
          {this.state.availableTeams.map((team, i) => <option value={team} key={i}>{team}</option>)}
        </select>
        <p>Teams beaten:</p>
        <div className="beaten-teams">
          {this.state.beatenTeams.map((team, i) => <div key={i}>{team}</div>)}
        </div>
      </div>
    );
  }
}

export default Sport;