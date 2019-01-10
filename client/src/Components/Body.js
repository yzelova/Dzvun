import React, { Component } from 'react'
import {
  Header
} 
from 'semantic-ui-react'


class Body extends Component{
  renderNotLogged = () => {
    return (
      <Header as='h1' textAlign='center'>
        Hi
      </Header>
    );
  }
  renderLogged = () => {
    return (
      <Header as='h1' textAlign='center'>
        Heyyyyy
      </Header>
    );
  }
  render () {
    
    const isLogged = this.props.isLogged;
    if(isLogged) {
      return this.renderLogged();
    } else {
      return this.renderNotLogged();
    }
  }
}
export default Body;