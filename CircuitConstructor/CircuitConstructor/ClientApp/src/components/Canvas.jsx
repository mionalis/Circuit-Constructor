import React, { Component } from 'react';
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import "./styles/canvasStyles.css";

export class Canvas extends Component {
    static displayName = Canvas.name;

    render() {
        return (
            <div className="canvas">
                <div className="dot-pattern-canvas ">
                    <Capacitor className="capacitor"></Capacitor>
                    <Resistor className="resistor"></Resistor>
                </div>
            </div>
        );
    }
}