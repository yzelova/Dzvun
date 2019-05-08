import React from 'react';
import './App.css';
import Login from '../src/components/Login/index.js'
import Home from '../src/components/Home/index.js'
import { Route, Switch, Redirect } from 'react-router-dom'

const get = require('../src/helpers/fetch').get

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isAuth: false,
      user: null,
      authenticating: true
    }
  }

  async componentDidMount() {
    const res = (await get('/get-sess-info/user'));
    if (res.ok) {
      const user = (await res.json()).user;
      this.setState({ isAuth: true, user: user, authenticating: false });
    } else {
      this.setState({ isAuth: false, authenticating: false });
    }
  }

  render() {
    const authenticating = this.state.authenticating;
    const isAuth = this.state.isAuth;
    return (
      authenticating ? null :
        <Switch>
          <Route exact path='/' render={() => (isAuth ? (<Redirect to='/home' />) : (<Login />))}/>
          <Route path='/home' render={() => (isAuth ? (<Home/>) : (<Redirect to='/'/>))}/>
        </Switch>
    );
        }
      }
      
      export default App;
