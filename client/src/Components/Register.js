import React, {Component} from 'react';
import { Segment, Form, Container, Button } from 'semantic-ui-react';

const req = require('../helpers/fetch');
const post = req.post;

class Register extends Component {

    constructor(){
        super();
        this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({[event.target.name]:  event.target.value})
    }

    onSubmit = async () => {
        try {
            await post('register', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password});
            this.props.isLogged(true);
            this.props.history.push("/");
        }
        catch (err)
        {
            console.error(err);
        }
    }


    render () {
        return (
            <Container style={{  padding: '1em 0em' }}>
                <Segment>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field>
                            <label> First Name</label>
                            <input placeholder='First Name' required name='firstName' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> Last Name</label>
                            <input placeholder='First Name' required name='lastName' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> E-mail </label>
                            <input type='email' placeholder='E-mail' required name='email' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> Password </label>
                            <input type='password' placeholder='Password' required name='password' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <Button fluid type='submit'>Submit</Button>
                        </Form.Field>
                        
                    </Form>
                </Segment>
            </Container>    
        )
    }
}

export default Register;