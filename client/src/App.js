import React, { Component } from 'react';
import Head from './Components/Head';
import Body from './Components/Body';
import SignUp from './Components/SignUp';
import Login from './Components/LogIn';
import {Route, Switch} from 'react-router-dom'

import './App.css';

const get = require('./helpers/fetch').get;

class App extends Component {
    async componentDidMount() {
     const res = await get('/get-sess-info/user') ;
     this.setState({isLoggedIn : res.user ? res.user : false})
    }
render() {
    return (
      <div>
        <Head props={this.state}/>
        <Switch>
          <Route exact path='/' render = {(props) =>
                                    (<Body {...props} />)
                                  }/>
          <Route path='/signup' render = {(props) =>
                                    (<SignUp {...props} />)
                                  }/>
          <Route path='/login' render = {(props) =>
                                    (<Login {...props} />)
                                  }/>
        </Switch>
      </div>
    );
  }
}

export default App;