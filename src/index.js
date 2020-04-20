import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

const Root = () => (
  <Router> 
    <Switch>
      <Route exact path="/" component = {App}/>
      <Route path="/login" component = {Login}/>
      <Route path="/register" component = {Register}/>

    </Switch> 
     
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
