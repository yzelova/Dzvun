
import React, { Component } from 'react';
import {
    Container,
    Header,
} from 'semantic-ui-react';
import './index.css';

class ProductsDropdown extends Component {

    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Container className="help-container">
                <Header>
                    FAQ
                </Header>
                <Header>
                    Guides
                </Header>
                <Header>
                    Contact Us
                </Header>
            </Container>
        )
    }
}

export default ProductsDropdown;