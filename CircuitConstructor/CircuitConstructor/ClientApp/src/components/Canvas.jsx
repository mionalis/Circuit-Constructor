import "./styles/canvasStyles.css";
import Shape from "./Shape";
import React from "react";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param shapes - Массив элементов электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 */
const Canvas = ({shapes}) => {
    return (
        <div className="canvas">
            <div className="dot-pattern-canvas-container">
                <div className="dot-pattern-canvas">
                    {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
                </div>
            </div>
        </div>
    );
}

export default Canvas;