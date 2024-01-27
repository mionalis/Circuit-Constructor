import React from "react";

/**
 * Кнопка добавления элемента на Canvas.
 * @param props 
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