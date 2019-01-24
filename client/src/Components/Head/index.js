import React, { Component } from 'react';
import DesktopHeader from '../DekstopHeader';
import MobileSidebar from '../MobileSidebar';
import {
  BrowserView,
  MobileView
} from "react-device-detect";


class Head extends Component 
{
    render () {
        return (
            <div>
                <BrowserView>
                    <DesktopHeader/>
                </BrowserView>
        
                <MobileView>
                    <MobileSidebar/>
                </MobileView> 
            </div>
        )
    }
}

export default Head;