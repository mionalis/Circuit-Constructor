import React, {Component, useEffect, useState} from 'react';
import "./styles/toolbarStyles.css";
import AddShapeButton from "./AddShapeButton";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";

// Реализует раскрывающийся список. 
const useToggle = (initialState) => {
    // Хранит и устанавливает содержимое раскрывающегося списка. 
    const [toggleValue, setToggleValue] = useState(initialState);
    // Раскрывает или скрывает содержимое раскрывающегося списка. 
    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
};

// Описывает левую панель с элементами.
const Toolbar = ({addNewShape}) => {
    // Хранит и устанавливает раскрывающийся список.
    const [toggle, setToggle] = useToggle()
    
    // Хранит и устанавливает элемент электрической цепи.
    const [shape, setShape] = useState({body: null})

    // Вызывает createNewShape перед отрисовкой элемента на монтажной поверхности.
    useEffect(() => {
        createNewShape()
    }, [shape])
    
    // Создает элемент и передает его в комнонент App. 
    const createNewShape = () => {
        const newShape = {
            id: Date.now(),
            ...shape
        }
        addNewShape(newShape)
    }
    
    // Получает элемент, выбранный из левой панели элементов. 
    const getShapeFromToolbar = () => {
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
                                        <AddShapeButton onClick={getShapeFromToolbar}>
                                        <Resistor className="shape-button-icon"/>Resistor</AddShapeButton></span>
                                    <span onClick={event => setShape({body:<Inductor/>})}>
                                        <AddShapeButton onClick={getShapeFromToolbar}>
                                        <Inductor className="shape-button-icon"/>Inductor</AddShapeButton></span>
                                    <span onClick={event => setShape({body:<Capacitor/>})}>
                                        <AddShapeButton onClick={getShapeFromToolbar}>
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