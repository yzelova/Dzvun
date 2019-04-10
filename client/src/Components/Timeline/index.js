import React, { Component } from 'react';
import {
  Container,
  Image
}
  from 'semantic-ui-react';
import './index.css';


const fetch = require('../../helpers/fetch')
const get = fetch.get;



class Timeline extends Component {

  constructor() {
    super();
    this.state = {
      loadingImages: true,
      images: []
    }
  }


  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async componentDidMount() {
    this.timer = setInterval(() => this._LoadData(), 1000)
  }

  async _LoadData(){
    console.log('Loaded Data');
    const images = (await (await get('/timeline')).json()).imageRes;
    const imagesBase64 = [];
    images.forEach(image => {
      const base64 = this.arrayBufferToBase64(image.data);
      imagesBase64.push(base64);
    });
    this.setState({ loadingImages: false, images: imagesBase64 })
  }

  renderImages() {
    const ret = [];
    let id = 0;
    this.state.images.forEach(image => {
      const src = 'data:image/jpeg;base64,' + image;
      ret.push(
        <div key={id}>
          <Image centered src={src} alt={id} ></Image>
        </div>
      )
      id++;
    });
    return ret;
  }

  render() {

    if (this.state.loadingImages) {
      return (
        <div>

        </div >
      )
    } else {
      const images = this.renderImages();
      return (
        <Container textAlign='center'>
          {images}
        </Container>
      )
    }


  }
}
export default Timeline;