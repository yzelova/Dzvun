
import React, { Component } from 'react'
import { Swiper, Slide } from 'react-dynamic-swiper';
import {Image} from 'semantic-ui-react';

import './index.css'
import firstImage from '../../public/images/1.png'
import secondImage from '../../public/images/2.png'


export default class Demo extends Component {
  constructor() {
    super()

    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)
    this.state = {
      slideCount: 5,
      options: {
        navigation: true,
        pagination: true,
        scrollBar: false,
        loop: false,
      }
    }
  }

  increment(e) {
    e.preventDefault()
    this.setState({ slideCount: this.state.slideCount + 1 })
  }

  decrement(e) {
    e.preventDefault()
    this.setState({ slideCount: this.state.slideCount - 1 })
  }

  toggleOption(prop) {
    this.setState({
      options: Object.assign({}, this.state.options, {
        [prop]: !this.state.options[prop],
      }),
    })
  }

  render() {
    return (
      <div className="Demo">
        <div className="Demo-swiper">
          <Swiper
            swiperOptions={{scrollbarHide: false}}
            {...this.state.options}
          >
              <Slide className="Demo-swiper__slide" key={1}>
                <Image src={firstImage}/>
              </Slide>
              <Slide className="Demo-swiper__slide" key={2}>
                <Image src={secondImage}/>
              </Slide>
          </Swiper>
        </div>
      </div>
    )
  }
}