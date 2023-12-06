import React, { Component } from 'react';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import "./styles/mainContentStyles.css";

export class MainContent extends Component {
    static displayName = MainContent.name;

    render() {
        return (
            <div className="content-container">
                <Toolbar />
                <div className="right-panel">
                   <Canvas/>
                    <div className="pages-panel">
                        <select multiple className="pages-select" size="1">
                            <option className="page-option">Page 1</option>
                            <option className="page-option">Page 2</option>
                        </select>
                        <button className="add-page-button">+</button>
                    </div>
                </div>
            </div>
        );
    }
}