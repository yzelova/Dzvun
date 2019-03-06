import React, { Component } from 'react';
import {Container, Header, Divider, Image, Label} from 'semantic-ui-react'
import bellImg from '../../public/images/bell.png';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.user.email,
            firstName: props.user.firstName,
            lastName: props.user.lastName
        }
    }

    render () { 
        let firstName, lastName;
        if(this.state.firstName && this.state.lastName) {
            firstName = this.state.firstName;
            lastName = this.state.lastName;
        }
        return (
            <Container>
                <Divider/>
                <Header as='h1'>Привет, {firstName} {lastName}</Header>
                <Header as='h3'>Твоите устройства: </Header>
                <Image src={bellImg} centered />
            </Container>
        )
    }
}

export default Profile;