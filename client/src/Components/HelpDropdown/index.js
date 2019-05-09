
import React, { Component } from 'react';
import {
    Container,
    Header,
} from 'semantic-ui-react';
import './index.css';

//Помощ - пхадащо меню

class ProductsDropdown extends Component {

    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Container className="help-container">
                <Header>
                    Често Задавани Въпроси
                </Header>
                <Header>
                    Съвети
                </Header>
                <Header>
                    Контакти
                </Header>
            </Container>
        )
    }
}

export default ProductsDropdown;