import React from "react";
import useToggle from "../hooks/useToggle";
import { ReactComponent as Resistor } from "../assets/circuitElements/Resistor.svg";
import { ReactComponent as Inductor } from "../assets/circuitElements/Inductor.svg";
import { ReactComponent as Capacitor } from "../assets/circuitElements/Capacitor.svg";
import AddSelectedShapeButton from "./AddSelectedShapeButton";
import "../styles/sidebarStyles.css";

/**
 * Перечисление, хранящее названия элементов.
 * @type {{RESISTOR: string, CONDUCTOR: string, CAPACITOR: string}}
 */
const shapeTypes = {
    Resistor: 'Resistor',
    Inductor: 'Inductor',
    Capacitor: 'Capacitor'
};

/**
 * Боковая панель с элементами.
 * @param {function} props.setIsDraggedFromSidebar - Устанавливает булевое значение, которое определяет,
 * был ли элемент добавлен на рабочую область перетаскиванием из боковой панели.
 * @param {function} props.createNewShape - Создает новый элемент цепи.
 * @param {function} props.handleDragStartFromSidebar - Срабатывает, когда пользователь начинает перетаскивать
 * элемент из Sidebar. Используется для установки нужного элемента при перетаскивании.
 * @param {function} props.handleDragEndFromSidebar - Срабатывает, когда пользователь заканчивает перетаскивать
 * элемент из боковой панели на Canvas. Используется для установки выбранного элемента на монтажную поверхность.
 * @returns {JSX.Element}
 * @constructor
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
                    <li>
                        <span 
                            onClick={setToggle} 
                            className="shape-type-select-button button-common"
                        >
                            Fundamental Items
                        </span>
                        {toggle && (
                            <ul>
                                <AddSelectedShapeButton
                                    shapeType={shapeTypes.Resistor}
                                    IconComponent={Resistor}
                                    createNewShape={props.createNewShape}
                                    setIsDraggedFromSidebar={props.setIsDraggedFromSidebar}
                                    handleDragStart={props.handleDragStartFromSidebar}
                                    handleDragEnd={props.handleDragEndFromSidebar}
                                />
                                <AddSelectedShapeButton
                                    shapeType={shapeTypes.Inductor}
                                    IconComponent={Inductor}
                                    createNewShape={props.createNewShape}
                                    setIsDraggedFromSidebar={props.setIsDraggedFromSidebar}
                                    handleDragStart={props.handleDragStartFromSidebar}
                                    handleDragEnd={props.handleDragEndFromSidebar}
                                />
                                <AddSelectedShapeButton
                                    shapeType={shapeTypes.Capacitor}
                                    IconComponent={Capacitor}
                                    createNewShape={props.createNewShape}
                                    setIsDraggedFromSidebar={props.setIsDraggedFromSidebar}
                                    handleDragStart={props.handleDragStartFromSidebar}
                                    handleDragEnd={props.handleDragEndFromSidebar}
                                />
                            </ul>
                        )}
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
};

export default Sidebar;
