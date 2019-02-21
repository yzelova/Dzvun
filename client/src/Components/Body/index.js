import React, { Component } from 'react';
import {
  Header,
  Image,
  Grid
}
  from 'semantic-ui-react';
import Swiper from '../Swiper';
import ringImage from '../../public/images/ring-image.jpg';

import './index.css';


class Body extends Component {
  renderNotLogged = () => {
    return (
      <Header as='h1' textAlign='center'>
        Not Logged
      </Header>
    );
  }
  renderLogged = () => {
    return (
      <Header as='h1' textAlign='center'>
        Logged
      </Header>
    );
  }
  render() {

    const isLogged = this.props.isLogged;

    return (
      <div>
        {isLogged?
          this.renderLogged()
          :
          this.renderNotLogged()
        }
        <Swiper />
        <Grid className="picture-menu-grid">
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8} >
              <Image src={ringImage} className="grid-col-image" />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
              <Image src={ringImage} className="grid-col-image" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div >
    )
  }
}
export default Body;