import React, { Component } from 'react';

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
            <div>
                <h1>Hi, {firstName} {lastName}</h1>
            </div>
        )
    }
}

export default Profile;