import React, {Component} from 'react';
import { Segment, Form, Container, Button } from 'semantic-ui-react';

const req = require('../helpers/fetch');
const post = req.post;
const get = req.get;

class Register extends Component {

    constructor(){
        super();
        this.state = {
        email: "",
        password: "",
        csrf: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        const csrf = await get('/get-sess-info/csrf');
        this.setState({csrf: csrf.csrfToken});
    }

    onChange(event){
        this.setState({[event.target.name]:  event.target.value})
    }

    onSubmit = async () => {
        await post('login', {
            email: this.state.email,
            password: this.state.password},
            this.state.csrf)
    }


    render () {
        return (
            <Container style={{  padding: '1em 0em' }}>
                <Segment>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field hidden name='_csrf' value={this.state.csrf} />
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