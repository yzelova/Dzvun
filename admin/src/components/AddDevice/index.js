import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const post = require('../../helpers/fetch').post;

export default class AddDevice extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            address: "",
            visibleMessageSuccess: false,
            visibleMessageError: true
        };
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = async () => {
        const res = await post('/admin/add-device', {
            address: this.state.address
        })
        if (res.ok) {
            this.setState({ visibleMessageSuccess: true });
            setTimeout(() => this.setState({ visibleMessageSuccess: false }), 1500);
        } else {
            this.setState({ visibleMessageError: false });
            setTimeout(() => this.setState({ visibleMessageError: true }), 1500);
        }
    }

    render() {
        return (
            <Form fluid onSubmit={this.onSubmit}>
                <Form.Input required fluid label='Адрес:' placeholder='Адрес' name='address' onChange={this.onChange} />
                <Form.Field fluid control={Button}>Добави</Form.Field>
                <Message success header='Успешно добавено устройство' visible={this.state.visibleMessageSuccess} />
                <Message negative header='Устройство с този адрес вече съществува!' hidden={this.state.visibleMessageError} />
            </Form>
        )
    }
}