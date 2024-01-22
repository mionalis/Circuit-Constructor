import React from "react";
import "./styles/canvasStyles.css";

/**
 * Кнопка добавления элемента на Canvas.
 * @param props 
 * @returns {JSX.Element}
 * @constructor
 */
const AddShapeButton = (props) => {
    return (
        <li {...props} className="shape-button button-common">
            {props.children}
        </li>
    );
}

export default AddShapeButton;