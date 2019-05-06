import React from 'react';
import { Segment, Image, Table, Button } from 'semantic-ui-react';

const { get, post } = require('../../helpers/fetch');

export default class ViewDevices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            devices: ""
        };
    }

    async onClickRemove(i, e) {
        const id = i;
        const res = await post('/admin/remove-device', { id });
        if (res.ok) {
            const resDevices = await get('/admin/view-devices');
            if (resDevices.ok) {
                const devices = await (resDevices.json());
                const rt = this.getDevices(devices);
                this.setState({ devices: rt });
            }
        }
    }

    getDevices(devices) {
        let i = 0;
        return devices.map(device => {
            return (<Table.Row key={++i}>
                <Table.Cell>{i}</Table.Cell>
                <Table.Cell>{device.deviceAddress}</Table.Cell>
                <Table.Cell>
                    <Button key={device.id} negative onClick={this.onClickRemove.bind(this, device.id)} >Премахни</Button>
                </Table.Cell>
            </Table.Row>)
        }
        )
    }

    async componentDidMount() {
        const res = await get('/admin/view-devices');
        if (res.ok) {
            const devices = await (res.json());
            const rt = this.getDevices(devices);
            this.setState({ devices: rt });
            this.setState({ loading: false });
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <Segment loading>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>
            )
        } else {
            const devices = this.state.devices
            return (
                <Segment>
                    <Table textAlign='center' celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Номер</Table.HeaderCell>
                                <Table.HeaderCell>Адрес</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {devices}
                        </Table.Body>
                    </Table>
                </Segment>
            )
        }
    }
}