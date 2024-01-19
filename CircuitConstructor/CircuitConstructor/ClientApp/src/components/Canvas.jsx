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

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        canvas.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])
    
    return (
        <div className="canvas" onDragEnter={props.onDragEnterHandler} id="canvas">
                {props.shapes.map(shape => <Shape post={shape} 
                                                  key={shape.id}
                                                  isDragged={props.isDragged}
                                                  shapeDropPosition={props.shapeDropPosition}
                                                  setOnGrid={props.setOnGrid} />)}
        </div>
    );
}

export default Canvas;