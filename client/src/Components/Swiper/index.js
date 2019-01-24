
import React, { Component } from 'react'
import { Swiper, Slide } from 'react-dynamic-swiper';
import {Image} from 'semantic-ui-react';

import './index.css'
import ringImage from '../../public/images/ring-image.jpg';

const OPTION_KEYS = ['navigation', 'pagination', 'scrollBar', 'loop']

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
            {(new Array(this.state.slideCount).fill(null).map((_, i) => (
              <Slide className="Demo-swiper__slide" key={i}>
                <Image src={ringImage}/>
              </Slide>
            )))}
          </Swiper>
        </div>
      </div>
    )
  }
}