import React from "react";

/**
 * Кнопка добавления элемента на Canvas.
 * @param {React.ReactNode} props.children - Элементы электрической цепи, передаваемые кнопкой.
 * @returns {JSX.Element}
 * @constructor
 */
const AddShapeButton = (props) => {
    return (
        <li {...props}>
            {props.children}
        </li>
    );
}

export default AddShapeButton;