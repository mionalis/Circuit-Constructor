import React from "react";
import "./styles/canvasStyles.css";

// Кнопка добавления элемента на Canvas.
const AddShapeButton = (props) => {
    return (
        <li {...props} className="shape-button">
            {props.children}
        </li>
    );
}

export default AddShapeButton;