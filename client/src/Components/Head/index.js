import React, { Component } from 'react';
import DesktopHeader from '../DekstopHeader';
import MobileSidebar from '../MobileSidebar';
import {
  BrowserView,
  MobileView
} from "react-device-detect";


class Head extends Component 
{
    constructor (props) {
        super(props);
        this.state = {
            user: props.user,
            authenticating: props.authenticating
        }
    }
    render () {
        const user = this.state.user;
        const authenticating = this.state.authenticating;
        return (
            <div>
                <BrowserView>
                    <DesktopHeader user = {user} authenticating = {authenticating}/>
                </BrowserView>
        
                <MobileView>
                    <MobileSidebar/>
                </MobileView> 
            </div>
        )
    }
}

export default Head;