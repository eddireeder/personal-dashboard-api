import React from 'react';
import './WeatherPreview.css';
import axios from 'axios';

class WeatherPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unavailable: false,
      weather: null
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000, enableHighAccuracy: true});
    });
  }

  async updateWeather() {
    try {
      const position = await this.getCurrentPosition();
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {params: {
        appid: 'd0a10211ea3d36b0a6423a104782130e',
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        units: 'metric'
      }});
      this.setState({
        unavailable: false,
        weather: response.data
      });
    } catch (e) {
      this.setState({
        unavailable: true,
        weather: null
      });
    }
  }

  componentDidMount() {
    this.updateWeather();
  }

  render() {
    let content;
    if (this.state.unavailable) {
      content = (
        <p>Currently not available</p>
      );
    } else if (this.state.weather === null) {
      content = (
        <p>Loading</p>
      );
    } else {
      content = (
        <React.Fragment>
          <div className="weather">
            <img src={'http://openweathermap.org/img/wn/' + this.state.weather.weather[0].icon + '@2x.png'}/>
            <div>
              <div>{this.state.weather.main.temp}</div>
              <div>degrees</div>
            </div>
          </div>
          <div className="location">{this.state.weather.name}</div>
        </React.Fragment>
      );
    }
    return (
      <div className="WeatherPreview preview">
        {content}
      </div>
    );
  }
}

export default WeatherPreview;