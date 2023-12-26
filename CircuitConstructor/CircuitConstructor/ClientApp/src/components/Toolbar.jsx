import React, {Component, useState} from 'react';
import "./styles/toolbarStyles.css";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import AddShapeButton from "./AddShapeButton";
import $ from 'jquery';

const AddNewResistor = (event) => {
    event.preventDefault()
    console.log('Hello!');
    const NewResistor= {
        id: Date.now(),
        body: <Resistor/>
    }
}

const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
};

const Toolbar = () => {
    
    const [toggle, setToggle] = useToggle()
    
        return (
            <div className="toolbar-container">
                <h3>Shapes</h3>
                <input className="search-shapes-input" placeholder="Search shape"></input>
                <div className="shapes-container">
                    <ul>
                        <li><span onClick={setToggle}  className="shape-types-select">Fundamental Items</span>
                            {toggle && (
                            <ul>
                               {/* <li className="shape-button" onClick={AddNewElement}>
                                    <Resistor className="shape-button-icon"/>Resistor</li>*/}
                                <AddShapeButton onClick={AddNewResistor}>
                                    <Resistor className="shape-button-icon"/>
                                    Resistor</AddShapeButton>
                                <li className="shape-button">
                                    <Inductor className="shape-button-inductor-icon"/>Inductor</li>
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