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
    
    const increasePatternSize = (coordinate, property, sizeProperty, triggerZoneLength) => {
        const canvas = document.getElementById('canvas');
        const dotPattern = document.getElementById('pattern');
        let patternSize = dotPattern[sizeProperty];
        
        if (coordinate > patternSize - triggerZoneLength) {
            patternSize += canvas[sizeProperty] / 3;
            dotPattern.style[property] = `${patternSize}px`;
        }
    };
    
    return (
        <div className="canvas" id="canvas">
            <div className="dot-pattern-canvas" id="pattern" ref={canvasRef} onDragEnter={props.onDragEnterHandler}
                 onDragLeave={props.onDragLeaveHandler}>
                {props.shapes.map(shape => <Shape post={shape} 
                                                  key={shape.id}
                                                  isDragged={props.isDragged}
                                                  shapeDropPosition={props.shapeDropPosition}
                                                  setOnGrid={props.setOnGrid}
                                                  increasePatternSize={increasePatternSize}/>)}
            </div>
        </div>
    );
}

export default Canvas;