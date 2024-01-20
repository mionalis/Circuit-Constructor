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
     * Ссылка на компонент Canvas.
     * @type {React.MutableRefObject<undefined>}
     */
    const canvasRef = useRef();
    
    /**
     * Меняет иконку возле перетаскиваемого элемента, когда тот заходит на Canvas.
     */
    useEffect(() => {
        canvasRef.current.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])
    
    return (
        <div className="canvas" id="canvas" ref={canvasRef} onDragEnter={props.onDragEnterHandler}>
                {props.shapes.map(shape => <Shape post={shape} 
                                                  key={shape.id}
                                                  isDragged={props.isDragged}
                                                  shapeDropPosition={props.shapeDropPosition}
                                                  setOnGrid={props.setOnGrid} />)}
        </div>
    );
}

export default Canvas;