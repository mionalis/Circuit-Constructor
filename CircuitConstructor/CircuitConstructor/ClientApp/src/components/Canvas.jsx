import React, {createRef, useEffect, useRef, useState} from "react";
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
    const dotPatternRef = useRef(null);
    const rotateButtonContainerRef = useRef(null);
    const shapeRefs = props.shapes.map(() => createRef());
    
    const [selectedShape, setSelectedShape] = useState(null);
    const [thisCanRotate, setThisCanRotate] = useState(false);
    const [isDragDisabled, setIsDragDisabled] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    
    /**
     * Меняет иконку возле перетаскиваемого элемента, когда тот заходит на Canvas.
     */
    useEffect(() => {
        dotPatternRef.current.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])

    const onMouseDownHandler = (index) => {
        setSelectedShape(shapeRefs[index].current);
    }
    
    const increasePatternSize = (coordinate, property, sizeProperty, triggerZoneLength) => {
        let patternSize = dotPatternRef.current[sizeProperty];
        
        if (coordinate > patternSize - triggerZoneLength) {
            patternSize += canvasRef.current[sizeProperty] / 3;
            dotPatternRef.current.style[property] = `${patternSize}px`;
        }
    };
    
    const onMouseMoveHandler = (event) => {
        if(!thisCanRotate) {
           return;
        }
        
        handleRotate(event);
        const rotateButton = rotateButtonContainerRef.current;
        selectedShape.style.rotate = `${rotationAngle}deg`;
        rotateButton.style.rotate = `${rotationAngle}deg`;
    }

    const handleRotate = (event) => {
        const shapeBoundingRect = selectedShape.getBoundingClientRect();
        const shapeCenterX = shapeBoundingRect.left + shapeBoundingRect.width / 2;
        const shapeCenterY = shapeBoundingRect.top + shapeBoundingRect.height / 2;
        
        const deltaX = event.clientX - window.scrollX - shapeCenterX;
        const deltaY = event.clientY - window.scrollY - shapeCenterY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 180;
        const angleOnGrid = props.setOnGrid(angle, 15);
        
        setRotationAngle(angleOnGrid);
    };
    
    const onMouseUpHandler = (e) => {
        setThisCanRotate(false);
    }
    
    return (
        <div className="canvas" id="canvas"  ref={canvasRef}>
            <div className="dot-pattern-canvas"
                 ref={dotPatternRef}
                 onDragEnter={props.onDragEnterHandler}
                 onDragLeave={props.onDragLeaveHandler}
                 onMouseMove={onMouseMoveHandler}
                 onMouseUp={onMouseUpHandler}>
                {props.shapes.map((shape, index) => <Shape post={shape} 
                                                           key={shape.id} 
                                                           ref={shapeRefs[index]} 
                                                           isDragged={props.isDragged} 
                                                           shapeDropPosition={props.shapeDropPosition} 
                                                           setOnGrid={props.setOnGrid} 
                                                           increasePatternSize={increasePatternSize} 
                                                           setThisCanRotate={setThisCanRotate} 
                                                           thisCanRotate={thisCanRotate} 
                                                           isDragDisabled={isDragDisabled} 
                                                           setIsDragDisabled={setIsDragDisabled}
                                                           onMouseDownHandler={() => onMouseDownHandler(index)}
                                                           rotateButtonContainerRef={rotateButtonContainerRef}/>)}
            </div>
        </div>
    );
}

export default Canvas;