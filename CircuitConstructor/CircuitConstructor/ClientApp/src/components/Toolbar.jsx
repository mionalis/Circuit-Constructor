import React, { Component } from 'react';
import "./styles/toolbarStyles.css";

export class Toolbar extends Component {
    static displayName = Toolbar.name;

    render() {
        return (
            <div className="toolbar-container">
                <h2>Shapes</h2>
                <input className="search-shapes-input" placeholder="Search shape"></input>
                <select multiple className="shape-types-select" size="2"> 
                    <option className>Fundamental Items</option>
                    <option>Other</option>
                </select>
                <hr></hr>
                <button className="shape-button">Resistor</button>
                <button className="shape-button">Capacitor</button>
                <button className="shape-button">Inductor</button>
            </div>
        );
    }
}