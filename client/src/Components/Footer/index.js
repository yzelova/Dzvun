import React, { Component } from 'react';
import {
    Segment, Container, Grid, Header
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
                                <Header className="footer-group-header"> Company </Header>
                            </Grid.Column>
                            <Grid.Column className="footer-grid-col">
                                <Header className="footer-group-header">Support</Header>
                            </Grid.Column>
                            <Grid.Column className="footer-grid-col">
                                <Header className="footer-group-header"> Follow Us </Header>
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
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                                <Container className="footer-group-text"> Test </Container>
                                            </Grid.Column>
                                        </Grid>
                                    </Container>
                                </Grid.Column>
                                <Grid.Column className="footer-grid-col">
                                    <Container className="footer-group">
                                        <Grid.Column>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                        </Grid.Column>
                                    </Container>
                                </Grid.Column>
                                <Grid.Column className="footer-grid-col">
                                    <Container className="footer-group">
                                        <Grid.Column>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
                                            <Container className="footer-group-text"> Test </Container>
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