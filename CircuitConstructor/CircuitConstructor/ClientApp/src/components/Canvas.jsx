import React, {useEffect, useRef} from "react";
import Shape from "./Shape";
import "./styles/canvasStyles.css";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 * @param props
 */
const Canvas = (props) => {
    /**
     * Меняет иконку возле перетаскиваемого элемента, когда тот заходит на Canvas.
     */
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        canvas.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])
    
    return (
        <div className="canvas" id="canvas" onDragEnter={props.onDragEnterHandler}>
                {props.shapes.map(shape => <Shape post={shape} 
                                                  key={shape.id}
                                                  isDragged={props.isDragged}
                                                  shapeDropPosition={props.shapeDropPosition}
                                                  setOnGrid={props.setOnGrid} />)}
        </div>
    );
}

export default Canvas;