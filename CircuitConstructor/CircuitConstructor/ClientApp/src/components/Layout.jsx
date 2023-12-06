import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Footer } from './Footer';
import "./styles/mainContentStyles.css";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="main-container">
                <div className="content-container">
                    <Container tag="main" className="main">
                        {this.props.children}
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}