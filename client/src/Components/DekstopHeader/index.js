
import React, { Component } from 'react';
import {
    Button,
    Container,
    Menu,
    Segment,
    Visibility,
    Image,
    Popup,
    Grid
} from 'semantic-ui-react';
import Login from '../Login';
import { Link } from 'react-router-dom';
import logo from '../../public/images/dzvun-logo.jpg';
import './index.css';



class DesktopHeader extends Component {

    constructor() {
        super();
        this.state = {};
    }

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { fixed } = this.state;
        return (
            <Visibility
                once={false}
                onBottomPassed={this.showFixedMenu}
                onBottomPassedReverse={this.hideFixedMenu}
                className="dekstop-header"
            >

                <Segment
                    inverted
                    textAlign='center'
                    vertical
                    className="dekstopheader"
                >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'
                        className="dekstopheader-menu"
                        style={{ padding: '0em 0em' }}
                    >
                        <Container>
                            <Menu.Item as={Link} to='/' style={{ padding: '0em 0em' }}  >
                                <Image src={logo} className='logo-image' />
                            </Menu.Item>
                            <Menu.Item position='right' style={{ padding: '1em 0em' }}>
                                <Popup
                                    trigger={
                                        <Button inverted={!fixed} className="dekstopheader-button" color="blue">
                                            Log in
                                    </Button>
                                    }
                                    content={
                                        <Login />
                                    }
                                    basic
                                    on="click"
                                />
                                <Button as={Link} to='/signup' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }} className="dekstopheader-button" color="blue">
                                    Sign Up
                                    </Button>
                            </Menu.Item>
                        </Container>
                    </Menu>
                </Segment>
            </Visibility>
        )
    }
}

export default DesktopHeader;