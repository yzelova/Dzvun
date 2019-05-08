import React, { Component } from 'react';
import {
    Segment, Container, Grid, Header
}
    from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './index.css';


class Body extends Component {

    render() {
        return (
            <Segment className="footer-div">
                <Grid>
                    <Grid.Row>
                        <Grid.Column className="footer-grid-col" >
                            <Header className="footer-group-header"> Услуги </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column className="footer-grid-col" >
                                <Container fluid className="footer-group">
                                    <Grid columns={2}>
                                        <Grid.Column>
                                            <Container as={Link} to='/shop' className="footer-group-text"> Закупуване на устройство </Container>
                                            <Container className="footer-group-text"> Сваляне на мобилното приложение </Container>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Container as={Link} to='/login' className="footer-group-text"> Вход </Container>
                                            <Container as={Link} to='/signup' className="footer-group-text"> Регистрация </Container>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Segment>

        )
    }
}
export default Body;