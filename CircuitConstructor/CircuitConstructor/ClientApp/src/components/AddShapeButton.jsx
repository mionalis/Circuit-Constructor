import React from "react";
import "./styles/canvasStyles.css";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";

const AddShapeButton = (props) => {
    return (
        <li {...props} className="shape-button">
            {props.children}
        </li>
    );
}

export default AddShapeButton;