import React, {Component, useEffect, useState} from 'react';
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

const Toolbar = ({addNewShape}) => {
    const [toggle, setToggle] = useToggle()
    
    const [shape, setShape] = useState({body: null})

    useEffect(() => {
        createNewShape()
    }, [shape])
    
    const createNewShape = () => {
        const newShape = {
            id: Date.now(),
            ...shape
        }
        addNewShape(newShape)
    }
    
    const addNewShapeFromToolbar = () => {
        setShape(shape)
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
                                    <span onClick={event => setShape({body:<Resistor/>})}>
                                        <AddShapeButton onClick={addNewShapeFromToolbar}>
                                        <Resistor className="shape-button-icon"/>Resistor</AddShapeButton></span>
                                    <span onClick={event => setShape({body:<Inductor/>})}>
                                        <AddShapeButton onClick={addNewShapeFromToolbar}>
                                        <Inductor className="shape-button-icon"/>Inductor</AddShapeButton></span>
                                    <span onClick={event => setShape({body:<Capacitor/>})}>
                                        <AddShapeButton onClick={addNewShapeFromToolbar}>
                                        <Capacitor className="shape-button-icon"/>Capacitor</AddShapeButton></span>
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