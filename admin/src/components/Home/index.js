import React from 'react';
import { Grid, Image, Segment, Header, Menu } from 'semantic-ui-react';
import './style.css'
import logo from '../../images/dzvun-logo.png'
import { Switch, Route, Link } from 'react-router-dom';
import AddDevice from '../AddDevice/index';
import ViewDevices from '../ViewDevices/index';

const post = require('../../helpers/fetch').post;

//Компонент за начална страница

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            activeItem: null
        };
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async handleLogOut() {
        const res = await post('/admin/logout')
        if(res.ok) {
            window.location.reload();
        }
    }

    render() {
        return (
            <div className='home-page' style={{ height: '100vh' }}>
                <Grid verticalAlign='middle' columns={2} centered>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment textAlign='center' className='home-segment' style={{ height: '80vh' }}>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ height: '80vh' }}>
                                            <Image centered src={logo} className='login-logo' />
                                            <Segment textAlign='left' basic>
                                                <Menu fluid vertical>
                                                    <Menu.Item>
                                                        <Menu.Header>Функции</Menu.Header>
                                                        <Menu.Item name='add' as={Link} to='/home/add' onClick={() => this.setState({ activeItem: "add" })} active={this.state.activeItem === 'add'} >Добавяне на устройство</Menu.Item>
                                                        <Menu.Item name='view' as={Link} to='/home/view' onClick={() => this.setState({ activeItem: "view" })} active={this.state.activeItem === 'view'}>Всички налични устройства</Menu.Item>
                                                        <Menu.Item onClick={this.handleLogOut}>Изход</Menu.Item>
                                                    </Menu.Item>
                                                </Menu>
                                            </Segment>
                                        </Grid.Column>

                                        <Grid.Column verticalAlign='middle' width={11}>
                                            <Switch>
                                                <Route exact path='/home' render={() => <Header>Моля, изберете функция</Header>} />
                                                <Route path='/home/add' render={() => <AddDevice />} />
                                                <Route path='/home/view' render={() => <ViewDevices />} />
                                            </Switch>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}