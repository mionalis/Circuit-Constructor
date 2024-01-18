import React, {useEffect, useRef, useState} from "react";
import Shape from "./Shape";
import "./styles/canvasStyles.css";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param shapes - Массив элементов электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 */
const Canvas = (props) => {
    const ref = useRef(null);

    useEffect(() => {
        props.setCanvasWidth({x: ref.current.offsetLeft, y: ref.current.offsetTop});
        ref.current.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])
    
    return (
        <div className="canvas" onDragEnter={props.onDragEnterHandler} ref={ref}>
                {props.shapes.map(shape => <Shape post={shape} key={shape.id} thisFromSidebar={props.thisFromSidebar}
                                                  setDefaultPosition={props.setDefaultPosition}
                                                  defaultPosition={props.defaultPosition}/>)}
        </div>
    );
}

export default Canvas;