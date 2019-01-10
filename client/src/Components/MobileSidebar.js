import React, { Component } from 'react';
import {
    Container, 
    Sidebar,
    Menu, 
    Segment,
    Icon,
    Button,

} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class MobileSidebar extends Component {

    state = {sidebarOpened: false};

    handleToggle = () => this.setState({sidebarOpened: !this.state.sidebarOpened})

    render () {
        return (
            <div>
                <Sidebar
                as={Menu}
                animation='push'
                inverted
                vertical
                visible={this.state.sidebarOpened}
                >
                    <Menu.Item as='h3'>
                        Ring Ring
                    </Menu.Item>
                    <Menu.Item as={Link} to='/' onClick={this.handleToggle}>
                        Home
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={this.state.sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{padding: '0'}}
                    >
                    <Container>
                        <Menu inverted pointing secondary >
                            <Menu.Item onClick={this.handleToggle}>
                                <Icon name='sidebar'/>
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Button as='a' inverted>
                                    Log in
                                </Button>
                                <Button as={Link} to='/signup' inverted style={{ marginLeft: '0.5em' }}>
                                    Sign Up
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Container>
                    </Segment>
                </Sidebar.Pusher>
            </div> 
        )
    }
}
export default MobileSidebar;