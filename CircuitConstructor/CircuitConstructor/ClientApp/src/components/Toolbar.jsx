import React, {Component, useState} from 'react';
import "./styles/toolbarStyles.css";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import AddShapeButton from "./AddShapeButton";

const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);
    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
};

const Toolbar = ({ AddNewResistor }) => {
    const [toggle, setToggle] = useToggle()
        return (
            <div className="toolbar-container">
                <h3>Shapes</h3>
                <input className="search-shapes-input" placeholder="Search shape"></input>
                <div className="shapes-container">
                    <ul>
                        <li><span onClick={setToggle}
                                  className="shape-types-select">Fundamental Items</span>
                            {toggle && (
                                <ul>
                                    <AddShapeButton onClick={AddNewResistor}>
                                        <Resistor className="shape-button-icon"/>Resistor</AddShapeButton>
                                    <li className="shape-button">
                                        <Inductor className="shape-button-icon"/>Inductor</li>
                                    <li className="shape-button">
                                        <Capacitor className="shape-button-icon"/>Capacitor</li>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span></li>
                    </ul>
                </div>
            </div>
        );
}

export default Toolbar;