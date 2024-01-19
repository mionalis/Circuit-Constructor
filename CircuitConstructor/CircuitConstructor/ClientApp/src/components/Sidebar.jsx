import React, {useEffect, useState} from 'react';
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
 * @param addNewShape - Добавляет элемент электрической цепи в массив.
 * @returns {JSX.Element}
 * @constructor
 */
const Sidebar = (props) => {
    /**
     * Хранит и устанавливает раскрывающийся список.
     */
    const [toggle, setToggle] = useToggle()
    
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
                                <span onClick={event => props.setShape({body:<Resistor/>})}>
                                    <AddShapeButton id="shape-button" onClick={props.getShapeFromSidebar} draggable={true}
                                                    onDragEnd={(e, shapeType)=>props.onDragEndHandler(e, {body:<Resistor/>})}
                                                    onDragStart={(e)=>props.onDragStartHandler(e)}>
                                    <Resistor className="shape-button-icon" id="resistor" />Resistor</AddShapeButton></span>
                                <span onClick={event => props.setShape({body:<Inductor/>})}>
                                    <AddShapeButton onClick={props.getShapeFromSidebar}>
                                    <Inductor className="shape-button-icon"/>Inductor</AddShapeButton></span>
                                <span onClick={event => props.setShape({body:<Capacitor/>})}>
                                    <AddShapeButton onClick={props.getShapeFromSidebar}>
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

export default Sidebar;