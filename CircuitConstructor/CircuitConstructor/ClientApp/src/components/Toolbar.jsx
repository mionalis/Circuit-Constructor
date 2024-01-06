import React, {Component, useState} from 'react';
import "./styles/toolbarStyles.css";
import AddShapeButton from "./AddShapeButton";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";

const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);
    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
};

const Toolbar = ({add}) => {
    const [toggle, setToggle] = useToggle()
    
    const addNewResistor = (event) => {
        event.preventDefault()
        const newShape = {
            id: Date.now(),
            body: <Resistor/>
        }
        add(newShape)
    }

    const AddNewInductor = (event) => {
        event.preventDefault()
        const newShape = {
            id: Date.now(),
            body: <Inductor/>
        }
        add(newShape)
    }

    const AddNewCapacitor = (event) => {
        event.preventDefault()
        const newShape = {
            id: Date.now(),
            body: <Capacitor/>
        }
        add(newShape)
    }
    
        return (
            <div className="toolbar-container">
                <h3>Shapes</h3>
                <input className="search-shapes-input" placeholder="Search shape"></input>
                <div className="shapes-container">
                    <ul>
                        <li><span onClick={setToggle}
                                  className="shape-type-select-button">Fundamental Items</span>
                            {toggle && (
                                <ul>
                                    <AddShapeButton onClick={addNewResistor}>
                                        <Resistor className="shape-button-icon"/>Resistor</AddShapeButton>
                                    <AddShapeButton onClick={AddNewInductor}>
                                        <Inductor className="shape-button-icon"/>Inductor</AddShapeButton>
                                    <AddShapeButton onClick={AddNewCapacitor}>
                                        <Capacitor className="shape-button-icon"/>Capacitor</AddShapeButton>
                                </ul>
                            )}
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-type-select-button">Other</span></li>
                    </ul>
                </div>
            </div>
        );
}

export default Toolbar;