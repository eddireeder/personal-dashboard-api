import React from 'react';
import './SportPreview.css';
import axios from 'axios';

class SportPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenTeam: null,
      loading: true
    };
  }

  async getChosenTeam() {
    try {
      const {data} = await axios.get('/auth/profile');
      let state = {...this.state};
      state.chosenTeam = data.team;
      state.loading = false;
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
  }

  render() {
    let content;
    if (this.state.chosenTeam) {
      content = (
        <React.Fragment>
          <div className="team">{this.state.chosenTeam}</div>
          <div>See results...</div>
        </React.Fragment>
      );
    } else if (this.state.loading) {
      content = <div>Loading</div>;
    } else {
      content = <div>No team selected</div>;
    }
    return (
      <div className="SportPreview preview">
        {content}
      </div>
    )
  }
}

export default SportPreview