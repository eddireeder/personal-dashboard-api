import React from 'react';
import './News.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      unavailable: false,
      story: null
    };
  }

  async updateLatestStory() {
    try {
      const response = await axios.get('/news/latest');
      this.setState({
        loggedIn: true,
        unavailable: false,
        story: response.data
      });
    } catch (e) {
      // Log out if unauthorized
      if (e.response.status === 401) {
        localStorage.removeItem('user');
        this.setState({
          loggedIn: false,
          unavailable: false,
          story: null
        });
      } else {
        this.setState({
          loggedIn: true,
          unavailable: true,
          story: null
        });
      }
    }
  }

  componentDidMount() {
    this.updateLatestStory();
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to='/'></Redirect>;
    }
    let content;
    if (this.state.unavailable) {
      content = (
        <p>Currently not available</p>
      );
    } else if (this.state.story === null) {
      content = (
        <p>Loading</p>
      );
    } else {
      content = (
        <React.Fragment>
          <div className="title">{this.state.story.title}</div>
          <div className="content">{this.state.story.content}</div>
        </React.Fragment>
      );
    }

    return (
      <div className="News">
        {content}
      </div>
    );
  }
}

export default News;