import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Toolbar } from './Toolbar';
import { Footer } from './Footer';
import "./styles/indexStyles.css";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="main-container">
                <Toolbar />
                <div className="right-panel">
                    <div className="canvas-container">
                        <Container tag="main">
                            {this.props.children}
                        </Container>
                        <div className="left-ruler"></div>
                        <div className="top-ruler"></div>
                    </div>
                    <div className="bottom-panel"></div>
                </div>
         {/*       <Footer/>*/}
            </div>
        );
    }
}