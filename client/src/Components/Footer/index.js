import React, { Component } from 'react';
import {
    Segment, Container, Grid, Header, Icon
}
    from 'semantic-ui-react';

import './index.css';


class Body extends Component {

    render() {
        return (
            <div>
                <Segment className="footer-div">
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column className="footer-grid-col" >
                                <Header className="footer-group-header"> За нас </Header>
                            </Grid.Column>
                            <Grid.Column className="footer-grid-col">
                                <Header className="footer-group-header">Поддръжка</Header>
                            </Grid.Column>
                            <Grid.Column className="footer-grid-col">
                                <Header className="footer-group-header"> Последвайте ни </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column className="footer-grid-col" >
                                    <Container className="footer-group">
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Container className="footer-group-text"> История </Container>
                                                <Container className="footer-group-text"> Защо Dzvun? </Container>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Container className="footer-group-text"> Умни домове </Container>
                                                <Container className="footer-group-text"> Сигурност </Container>
                                            </Grid.Column>
                                        </Grid>
                                    </Container>
                                </Grid.Column>
                                <Grid.Column className="footer-grid-col">
                                    <Container className="footer-group">
                                    <Grid columns={2}>
                                        <Grid.Column >
                                            <Container className="footer-group-text"> Характеристи и изисквания </Container>
                                            <Container className="footer-group-text"> Закупуване на устройство </Container>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Container className="footer-group-text"> Свързване на устройство </Container>
                                            <Container className="footer-group-text"> Контакти </Container>
                                        </Grid.Column>
                                    </Grid>
                                        
                                    </Container>
                                </Grid.Column>
                                <Grid.Column className="footer-grid-col">
                                    <Container className="footer-group">
                                        <Grid.Column>
                                            <Container className="footer-group-text"> <Icon className='facebook'/> Dzvun </Container>
                                            <Container className="footer-group-text"> <Icon className='twitter icon'/> @dzvun </Container>
                                        </Grid.Column>
                                    </Container>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Segment>
            </div >
        )
    }
}
export default Body;