import React, {useState} from 'react';
import AddShapeButton from "./AddShapeButton";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import "./styles/sidebarStyles.css";

/**
 * Реализует раскрывающийся список.
 * @returns {[toggleValue, toggler]}
 */
const useToggle = () => {
    /**
     * Хранит и устанавливает содержимое раскрывающегося списка.
     */
    const [toggleValue, setToggleValue] = useState();
    /**
     * Раскрывает или скрывает содержимое раскрывающегося списка.
     */
    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler];
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
                              className="shape-type-select-button">Fundamental Items</span>
                        {toggle && (
                            <ul>
                                <span onClick={event => props.createNewShape(<Resistor />)}>
                                    <AddShapeButton onClick={props.setIsDragged(false)} 
                                                    id="shape-button" 
                                                    draggable
                                                    onDragEnd={(e, shapeType)=>props.onDragEndHandler(e, <Resistor />)}
                                                    onDragStart={(e)=>props.onDragStartHandler(e)}>
                                        <Resistor className="shape-button-icon" id="resistor" />Resistor
                                    </AddShapeButton>
                                </span>
                                <span onClick={event => props.createNewShape(<Inductor />)}>
                                    <AddShapeButton onClick={props.setIsDragged(false)}>
                                        <Inductor className="shape-button-icon"/>Inductor
                                    </AddShapeButton>
                                </span>
                                <span onClick={event => props.createNewShape(<Capacitor />)}>
                                    <AddShapeButton onClick={props.setIsDragged(false)}>
                                        <Capacitor className="shape-button-icon"/>Capacitor
                                    </AddShapeButton>
                                </span>
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

export default Sidebar;