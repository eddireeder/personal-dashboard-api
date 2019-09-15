import React from 'react';
import './DashboardButton.css';

class DashboardButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="DashboardButton">
        <div className="title">{this.props.title}</div>
        {this.props.preview}
      </div>
    );
  }
}

export default DashboardButton;