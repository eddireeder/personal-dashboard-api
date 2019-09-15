import React from 'react';
import './NewsPreview.css';
import axios from 'axios';

class NewsPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story: null
    };
  }

  async updateLatestStory() {
    const response = await axios.get('/news/latest');
    this.setState({
      story: response.data
    });
  }

  componentDidMount() {
    this.updateLatestStory();
  }

  render() {
    let content;
    if (this.state.story === null) {
      content = (
        <p>Loading</p>
      );
    } else {
      content = (
        <React.Fragment>
          <div className="title">{this.state.story.title}</div>
          <div>{this.state.story.content}</div>
        </React.Fragment>
      );
    }

    return (
      <div className="NewsPreview">
        {content}
      </div>
    );
  }
}

export default NewsPreview;