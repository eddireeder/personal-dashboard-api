import React from 'react';
import './DashboardButton.css';
import { Link } from "react-router-dom";

class DashboardButton extends React.Component {

  render() {
    const content = (
      <div className="DashboardButton">
        <div className="title">{this.props.title}</div>
        {this.props.preview}
      </div>
    );

    if (this.props.to) {
      return (
        <Link to={this.props.to}>
          {content}
        </Link>
      );
    }
    return content;
  }
}

export default DashboardButton;