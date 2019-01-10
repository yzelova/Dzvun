
import React, { Component } from 'react';
import {
    Button,
    Container,
    Menu,
    Segment,
    Visibility,
  } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

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
        >
            <Segment    
                inverted
                textAlign='center'
                style={{  padding: '1em 0em' }}
                vertical
            >
                <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
                >
                    <Container>
                        <Menu.Item as={Link} to='/'>
                            Home
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button as={Link} to='/login' inverted={!fixed}>
                                Log in
                            </Button>
                            <Button as={Link} to='/register' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
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