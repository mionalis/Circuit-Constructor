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
                <div className="content-container">
                    <Toolbar />
                    <div className="right-panel">
                        <div className="canvas-container">
                            <div className="canvas">
                                <Container tag="main">
                                    {this.props.children}
                                </Container>
                             </div>
                        </div>
                        <div className="pages-panel">
                            <select multiple className="pages-select" size="1">
                                <option className="page-option">Page 1</option>
                                <option className="page-option">Page 2</option>
                            </select>
                            <button className="add-page-button">+</button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}