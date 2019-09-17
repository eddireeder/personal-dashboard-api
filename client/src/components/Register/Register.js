import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      error: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(event) {
    event.preventDefault();
    // Verify password
    if (this.refs.password.value !== this.refs.passwordConfirmed.value) {
      this.setState({
        created: false,
        error: "Passwords do not match"
      });
      return;
    }
    // Send log in request to the server
    try {
      const response = await axios.post('/auth/register', {
        username: this.refs.username.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      });
      if (response.status === 200) {
        // Show success message
        this.setState({
          created: true,
          error: ""
        });
      }
    } catch (e) {
      const message = e.response.data ? e.response.data.message : "Something went wrong, try again later.";
      this.setState({
        created: false,
        error: message
      });
    }
  }

  render() {
    return (
      <div className="Register">
        <h1>Dev Challenge</h1>
        <form onSubmit={this.submitForm}>
          <div className="top">
            <div className="left">
              <input type="text" placeholder="Username" ref="username"></input>
              <input type="password" placeholder="Password" ref="password"></input>
            </div>
            <div className="right">
            <input type="text" placeholder="Email" ref="email"></input>
            <input type="password" placeholder="Confirm password" ref="passwordConfirmed"></input>
            </div>
          </div>
          <div className="bottom">
            {this.state.created ? <p className="success">Account created</p> : <p className="error">{this.state.error}</p>}
            <input type="submit" value="Register" className="button"/>
            <p className="login-link">Have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
