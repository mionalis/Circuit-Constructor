import React from 'react';
import AddShapeButton from "./AddShapeButton";

/**
 * Реализует добавление передаваемого в компонент элемента на монтажную поверхность через кнопку AddShapeButton.
 * @param {string} props.shapeType - Название элемента электрической цепи.
 * @param {Object} props.IconComponent - Элемент электрической цепи.
 * @param {function} props.setIsDraggedFromSidebar - Устанавливает булевое значение, которое определяет,
 * был ли элемент добавлен на рабочую область перетаскиванием из боковой панели.
 * @param {function} props.handleDragStart - Срабатывает, когда пользователь начинает перетаскивать
 * элемент из Sidebar. Используется для установки нужного элемента при перетаскивании.
 * @param {function} props.handleDragEnd - Срабатывает, когда пользователь заканчивает перетаскивать
 * элемент из боковой панели на Canvas. Используется для установки выбранного элемента на монтажную поверхность.
 * @returns {JSX.Element}
 * @constructor
 */
const AddSelectedShapeButton = (props) => {
    /**
     * При клике мышью на кнопку выбора фигуры из боковой панели создает выбранный элемент.
     */
    const handleClick = () => {
        props.createNewShape(<props.IconComponent />);
        props.setIsDraggedFromSidebar(false);
    };

    return (
        <AddShapeButton
            className="shape-button button-common"
            id="shape-button"
            draggable
            onClick={handleClick}
            onDragStart={(e) => props.handleDragStart(e, props.shapeType)}
            onDragEnd={(e) => props.handleDragEnd(e, <props.IconComponent />)}
        >
            <props.IconComponent
                className="shape-button-icon"
                id={props.shapeType}
            />
            {props.shapeType}
        </AddShapeButton>
    );
};

export default AddSelectedShapeButton;