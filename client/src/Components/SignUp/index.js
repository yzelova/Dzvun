import React, { Component } from 'react';
import { Segment, Form, Container, Button, Checkbox, Modal } from 'semantic-ui-react';

const req = require('../../helpers/fetch');
const post = req.post;

class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            openModal: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = async () => {
        const res = await post('signup', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        });
        if (res.ok) {
            window.location.reload();
        }

    }

    onClickAgree = () => {
        this.setState({openModal: true})
    }

    onCloseModal = () => {
        this.setState({openModal: false})
    }


    render() {
        return (
            <Container style={{ padding: '1em 0em' }}>
                <Segment>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Field hidden name='_csrf' value={this.state.csrf} />
                        <Form.Field>
                            <label> Собствено име</label>
                            <input placeholder='Собствено име' required name='firstName' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> Фамилия</label>
                            <input placeholder='Фамилия' required name='lastName' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> E-mail </label>
                            <input type='email' placeholder='E-mail' required name='email' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field>
                            <label> Парола </label>
                            <input type='password' placeholder='Парола' required name='password' onChange={this.onChange}></input>
                        </Form.Field>
                        <Form.Field required>
                            <Checkbox label={<label>Съгласявам се с <a onClick={this.onClickAgree}>Условията за ползване</a></label>}  />
                        </Form.Field>
                        <Form.Field>
                            <Button fluid type='submit'>Регистрирай се!</Button>
                        </Form.Field>
                    </Form>
                </Segment>
                <Modal
                 onClose={this.onCloseModal}
                 open={this.state.openModal}>
                    <Modal.Header>Условия за ползване</Modal.Header>
                    <Modal.Content>
                        Проектът е разработен под GNU (General Public License).
                    </Modal.Content>
                </Modal>
            </Container>
        )
    }
}

export default Register;