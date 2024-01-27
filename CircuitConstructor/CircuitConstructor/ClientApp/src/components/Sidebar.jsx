﻿import React from 'react';
import AddShapeButton from "./AddShapeButton";
import useToggle from './customHooks/useToggle';
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import "./styles/sidebarStyles.css";

/**
 * Перечисление, хранящее названия элементов.
 * @type {{RESISTOR: string, CONDUCTOR: string, CAPACITOR: string}}
 */
const shapeTypes = {
    Resistor: 'resistor',
    Inductor: 'inductor',
    Capacitor: 'capacitor'
};

/**
 * Описывает левую панель с элементами.
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const Sidebar = (props) => {
    /**
     * Хранит и устанавливает раскрывающийся список.
     */
    const [toggle, setToggle] = useToggle();
    
    return (
        <div className="sidebar-container">
            <h3>Shapes</h3>
            <input className="search-shapes-input" placeholder="Search shape"></input>
            <div className="shapes-container">
                <ul>
                    <li><span onClick={setToggle}
                              className="shape-type-select-button button-common">Fundamental Items</span>
                        {toggle && (
                            <ul>
                                <span onClick={event => props.createNewShape(<Resistor />)}>
                                    <AddShapeButton className="shape-button button-common"
                                                    id="shape-button" 
                                                    draggable
                                                    onClick={props.setIsDragged(false)}
                                                    onDragStart={(e)=>
                                                        props.handleDragStartFromSidebar(e, shapeTypes.Resistor)}
                                                    onDragEnd={(e)=>props.handleDragEndFromSidebar(e, <Resistor />)} >
                                        <Resistor className="shape-button-icon" id="resistor" />Resistor
                                    </AddShapeButton>
                                </span>
                                <span onClick={event => props.createNewShape(<Inductor />)}>
                                    <AddShapeButton className="shape-button button-common"
                                                    id="shape-button"
                                                    draggable
                                                    onClick={props.setIsDragged(false)}
                                                    onDragStart={(e)=>
                                                        props.handleDragStartFromSidebar(e, shapeTypes.Inductor)}
                                                    onDragEnd={(e)=>props.handleDragEndFromSidebar(e, <Inductor />)}>
                                        <Inductor className="shape-button-icon" id="inductor" />Inductor
                                    </AddShapeButton>
                                </span>
                                <span onClick={event => props.createNewShape(<Capacitor />)}>
                                    <AddShapeButton className="shape-button button-common" 
                                                    id="shape-button"
                                                    draggable
                                                    onClick={props.setIsDragged(false)}
                                                    onDragStart={(e)=>
                                                        props.handleDragStartFromSidebar(e, shapeTypes.Capacitor)}
                                                    onDragEnd={(e)=>props.handleDragEndFromSidebar(e, <Capacitor />)}>
                                        <Capacitor className="shape-button-icon" id="capacitor" />Capacitor
                                    </AddShapeButton>
                                </span>
                            </ul>)}
                    </li>
                </ul>
                <ul>
                    <li>
                        <span className="shape-type-select-button button-common">
                            Other
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;