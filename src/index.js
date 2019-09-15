import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import App from './components/App/App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import * as serviceWorker from './serviceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render = {
    props => (localStorage.getItem('user') ? <Component {...props}/> : <Redirect to = {{pathname: '/login', state: {from: props.location}}}/>)
  }/>
);

const routing = (
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <PrivateRoute exact path="/" component={App}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
