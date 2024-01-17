import React, {Component, useEffect, useState} from 'react';
import "./styles/sidebarStyles.css";
import AddShapeButton from "./AddShapeButton";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";

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
    return [toggleValue, toggler]
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

    /**
     * Хранит и устанавливает элемент электрической цепи.
     */
    const [shape, setShape] = useState({body: null})
    
    /**
     * Вызывает createNewShape перед отрисовкой элемента на монтажной поверхности.
     */
    useEffect(() => {
        createNewShape()
    }, [shape])
    
    /**
     * Создает элемент и передает его в комнонент App.
     */
    const createNewShape = () => {
        const newShape = {
            id: Date.now(),
            ...shape
        }
        props.addNewShape(newShape)
    }
    
    /**
     * Получает элемент, выбранный из левой панели элементов.
     */
    const getShapeFromSidebar = () => {
        props.setThisFromSidebar(false);
        setShape(shape)
    }
    
    const onDragEndHandler = (e) => {
        if (!props.isCanBeDropped) {
            return;
        }
        setShape({body:<Resistor/>});
        props.setIsCanBeDropped(false);
        props.setThisFromSidebar(true);
        let a = Math.round((e.clientX - (window.innerWidth - props.canvasWidth)) / 20) * 20 - 20;
        let b = Math.round((e.clientY - props.topMenuHeight) / 20) * 20 - 20;
        props.setDefaultPosition({x: a, y: b});
    }

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
                                <span onClick={event => setShape({body:<Resistor/>})}>
                                    <AddShapeButton onClick={getShapeFromSidebar} draggable={true}
                                                    onDragEnd={(e)=>onDragEndHandler(e)}
                                                    onDrag={(e)=>props.onDragHandler(e)}>
                                    <Resistor className="shape-button-icon"/>Resistor</AddShapeButton></span>
                                <span onClick={event => setShape({body:<Inductor/>})}>
                                    <AddShapeButton onClick={getShapeFromSidebar}>
                                    <Inductor className="shape-button-icon"/>Inductor</AddShapeButton></span>
                                <span onClick={event => setShape({body:<Capacitor/>})}>
                                    <AddShapeButton onClick={getShapeFromSidebar}>
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