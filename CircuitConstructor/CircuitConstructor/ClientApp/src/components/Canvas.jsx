import React, {useEffect, useRef, useState} from "react";
import Shape from "./Shape";
import "./styles/canvasStyles.css";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param shapes - Массив элементов электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 */
const Canvas = ({shapes}) => {

    return (
        <div className="canvas">
            <div className="dot-pattern-canvas">
                    {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
            </div>
        </div>
    );
}

export default Canvas;