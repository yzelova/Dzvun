import React, { Component } from 'react';
import {
  Image,
  Grid,
  Header,
  Button,
  Icon
}
  from 'semantic-ui-react';
import Swiper from '../Swiper';
import door from '../../public/images/door.png'
import dzvun from '../../public/images/3.png'
import { Link } from 'react-router-dom';
import './index.css';


class Body extends Component {
  render() {

    return (
      <div>
        <Swiper />
        <Grid className="picture-menu-grid" textAlign='center'>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8} >
              <Image className="grid-col-image">
                <img src={door} alt='shop now'/>
                <Header style={{ position: 'absolute', bottom: 0, right: 0 }} as='h2' inverted color='white' className='shop-now-header'>Защитете дома си сега</Header>
                <Button as={Link} to={'/shop'} style={{ position: 'absolute', bottom: 0, right: 0 }} className='show-now-btn' color='green' icon labelPosition='right'>
                  Поръчай
                <Icon name='right arrow' />
                </Button>
              </Image>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={8}>
            <Image className="grid-col-image" bordered>
                <img src={dzvun} alt='download'/>
                <Header style={{ position: 'absolute', bottom: 0, left: 0, width: '50%' }} as='h2' className='download-header'>Инсталирайте мобилното приложение</Header>
                <Button style={{ position: 'absolute', bottom: 0, left: 0 }} className='download-btn' color='blue' icon labelPosition='right'>
                  Свали
                <Icon name='down arrow' />
                </Button>
              </Image>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div >
    )
  }
}
export default Body;