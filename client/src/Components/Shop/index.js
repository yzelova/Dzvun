import React, { Component } from 'react';
import {
    Image,
    Grid,
    Header,
    Button,
    Icon,
    List,
    Segment
}
    from 'semantic-ui-react';
import './style.css';
import device from '../../public/images/device.png'



class Body extends Component {
    render() {

        return (
            <div>
                <Segment color='blue' inverted className='device-segment'>
                    <Grid>
                        <Grid.Column width={6}>
                            <Image src={device} />
                        </Grid.Column>
                        <Grid.Column width={7} verticalAlign='middle'>
                            <Header inverted as='h2'>Dzvun - първо поколение</Header>
                            <List bulleted>
                                <List.Item>Лесно монтиране</List.Item>
                                <List.Item>Бързо и сигурно управление на устройствата</List.Item>
                                <List.Item>Неограничен достъп до всички услуги на платформата</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3} verticalAlign='bottom'>
                            <Button content='Очаквайте' color='yellow' icon='shop' labelPosition='left' className='soon-btn'/>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment color='yellow' inverted className='more-segment' verticalAlign='center' textAlign='center'>
                    <Header as='h1' inverted className='soon-header'>Очаквайте скоро! Нови попълнения към семейството на Dzvun!</Header>
                </Segment>
            </div >
        )
    }
}
export default Body;