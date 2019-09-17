import React from 'react';
import './App.css';
import DashboardButton from '../DashboardButton/DashboardButton';
import WeatherPreview from '../WeatherPreview/WeatherPreview';
import NewsPreview from '../NewsPreview/NewsPreview';
import SportPreview from '../SportPreview/SportPreview';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Good day {this.state.user.username}</h1>
        <div className="dashboard">
          <DashboardButton title="Weather" preview={<WeatherPreview></WeatherPreview>}></DashboardButton>
          <DashboardButton title="News" preview={<NewsPreview></NewsPreview>} to="/news"></DashboardButton>
          <DashboardButton title="Sport" preview={<SportPreview></SportPreview>} to="/sport"></DashboardButton>
          <DashboardButton title="Photos"></DashboardButton>
          <DashboardButton title="Tasks"></DashboardButton>
          <DashboardButton title="Clothes"></DashboardButton>
        </div>
      </div>
    );  
  }
}

export default App;
