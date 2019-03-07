import React, { Component } from 'react';
import Head from './Components/Head/index';
import Body from './Components/Body/';
import SignUp from './Components/SignUp/';
import Login from './Components/Login/';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import ReactUploadImage from './Components/ReactUploadImage';
import Timeline from './Components/Timeline';
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css';

const get = require('./helpers/fetch').get;

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      user: null,
      authenticating: true
    }
  }

  async componentDidMount() {
    const res = (await get('get-sess-info/user'));
    if(res.ok){
        const user = (await res.json()).user; 
        this.setState({isAuth: true, user: user, authenticating: false});
    } else {
      this.setState({isAuth: false, authenticating: false});
    }
  }


  render() {
    const isAuth = this.state.isAuth;
    const user = this.state.user;
    const authenticating = this.state.authenticating;
    if(authenticating)
    {
      return (
        <Head />
      )
      
    } else {
            return (
              <div className="page-div">
                <div className="body-div">
                  <Head user= {user} authenticating = {authenticating}/>
                  <Switch>
                    <Route exact path='/' component = {Body}/>
                    <Route path='/signup' render = {() => (isAuth ?  (<Redirect to='/timeline'/>) :  (<SignUp />) )}/>
                    <Route path='/login' render = {() => (isAuth ?  (<Redirect to='/timeline'/>) :  (<Login />) )}/>
                    <Route path='/timeline' render = {() => (isAuth ?  (<Timeline/>) :  (<Redirect to='/login'/>) ) }  />
                    <Route path='/profile' render = {() => (isAuth ? (<Profile user = {user} />) : (<Redirect to='/login'/>) )}/>
                    <Route path='/upload' component = {ReactUploadImage} />
                  </Switch>
                  <Footer/>
                </div>
              </div>
            );
          }
  }
}

export default App;