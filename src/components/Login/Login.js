import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      error: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(event) {
    event.preventDefault();
    // Send log in request to the server
    try {
      const response = await axios.post('/auth/login', {
        username: this.refs.username.value,
        password: this.refs.password.value
      });
      if (response.status === 200) {
        // Place the returned user object in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        this.setState({
          authenticated: true,
          error: ""
        });
      }
    } catch (e) {
      let message;
      if (e.response.status === 400) {
        message = "Username and password are required";
      } else if (e.response.status === 401) {
        message = "Couldn't log in with username/password";
      } else {
        message = "Something went wrong, try again later";
      }
      this.setState({
        authenticated: false,
        error: message
      });
    }
  }

  render() {
    if (this.state.authenticated === true) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className="Login">
        <h1>Dev Challenge</h1>
        <form onSubmit={this.submitForm}>
          <div className="top">
            <div className="left">
              <input type="text" placeholder="Username" ref="username"></input>
            </div>
            <div className="right">
              <input type="password" placeholder="Password" ref="password"></input>
            </div>
          </div>
          <div className="bottom">
            <p className="error">{this.state.error}</p>
            <input type="submit" value="Login" className="button"/>
            <p className="register-link">New to the challenge? <Link to="/register">Sign up</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
