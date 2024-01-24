import React, {useEffect, useRef, useState} from "react";
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

    const [thisCanRotate, setThisCanRotate] = useState(false);
    const [isDragDisabled, setIsDragDisabled] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [shapeCenter, setShapeCenter] = useState({});
    
    const onMouseMoveHandler = (event) => {
        if(thisCanRotate) {
            const mouseViewportX = event.clientX - window.scrollX;
            const mouseViewportY = event.clientY - window.scrollY;
            
            handleRotate({ mouseViewportX, mouseViewportY });
        }
    }

    const handleRotate = ({ mouseViewportX, mouseViewportY }) => {
        const deltaX = mouseViewportX - shapeCenter.x;
        const deltaY = mouseViewportY - shapeCenter.y;
        const initialAngle = 180;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - initialAngle;
        
        setRotation(props.setOnGrid(angle, 20));
        
        const button = document.getElementById("shape");
        const rotateButton = document.getElementById("rotate-button-container");
        button.style.rotate = `${rotation}deg`;
        rotateButton.style.rotate = `${rotation}deg`;
    };
    
    const onMouseUpHandler = (e) => {
        setThisCanRotate(false);
    }
    
    return (
        <div className="canvas" id="canvas">
            <div className="dot-pattern-canvas" 
                 id="pattern" 
                 ref={canvasRef}
                 onDragEnter={props.onDragEnterHandler}
                 onDragLeave={props.onDragLeaveHandler}
                 onMouseMove={onMouseMoveHandler}
                 onMouseUp={onMouseUpHandler}>
                {props.shapes.map(shape => <Shape post={shape} 
                                                  key={shape.id}
                                                  isDragged={props.isDragged}
                                                  shapeDropPosition={props.shapeDropPosition}
                                                  setOnGrid={props.setOnGrid}
                                                  increasePatternSize={increasePatternSize}
                                                  setThisCanRotate={setThisCanRotate}
                                                  thisCanRotate={thisCanRotate}
                                                  isDragDisabled={isDragDisabled}
                                                  setIsDragDisabled={setIsDragDisabled}
                                                  setShapeCenter={setShapeCenter}
                                                  rotation={rotation}/>)}
            </div>
        </div>
    );
}

export default Canvas;