
import React, { Component } from 'react';
import {
    Container,
    Header,
    Image,
    Grid
} from 'semantic-ui-react';
import './index.css';
import productImage from "../../public/images/dzvun.jpg";


class ProductsDropdown extends Component {

    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Grid>
                <Container>
                    <Image src={productImage} size="tiny" />
                    <Header> Dzvun </Header>
                    <Header.Subheader> Ново </Header.Subheader>
                </Container>
            </Grid>
        )
    }
}

export default ProductsDropdown;