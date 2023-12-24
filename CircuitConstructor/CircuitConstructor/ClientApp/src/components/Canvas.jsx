import React, { Component } from 'react';
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import "./styles/canvasStyles.css";

export class Canvas extends Component {
    static displayName = Canvas.name;

    render() {
        return (
            <div className="canvas">
                <div className="dot-pattern-canvas ">
                    <Inductor className="inductor"></Inductor>
                    <Resistor className="resistor"></Resistor>
                    <Capacitor className="capacitor"></Capacitor>
                </div>
            </div>
        );
    }
}