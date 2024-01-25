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
    const dotPatternRef = useRef();
    const shapeRef = useRef(null);
    const rotateButtonContainerRef = useRef(null);
    const shapeRefs = props.shapes.map(() => createRef());
    const [selectedShape, setSelectedShape] = useState(null);
    
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

    const [thisCanRotate, setThisCanRotate] = useState(false);
    const [isDragDisabled, setIsDragDisabled] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [shapeCenter, setShapeCenter] = useState({});
    
    const onMouseMoveHandler = (event) => {
        if(thisCanRotate) {
            const mouseViewportX = event.clientX - window.scrollX;
            const mouseViewportY = event.clientY - window.scrollY;
            
            handleRotate({ mouseViewportX, mouseViewportY }, event);
        }
    }

    const handleRotate = ({ mouseViewportX, mouseViewportY }, event) => {
        const rect = selectedShape.getBoundingClientRect();
        
        const deltaX = mouseViewportX - (rect.left + (rect.width / 2));
        const deltaY = mouseViewportY - (rect.top + rect.height / 2);
        console.log(deltaY);
        
        const initialAngle = 180;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - initialAngle;
        
        setRotation(props.setOnGrid(angle, 15));
        
        const rotateButton = rotateButtonContainerRef.current;

        selectedShape.style.rotate = `${rotation}deg`;
        rotateButton.style.rotate = `${rotation}deg`;
    };
    
    const onMouseUpHandler = (e) => {
        setThisCanRotate(false);
    }
    
    return (
        <div className="canvas" id="canvas"  ref={canvasRef}>
            <div className="dot-pattern-canvas" 
                 id="pattern" 
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
                                                  setShapeCenter={setShapeCenter}
                                                  rotation={rotation}
                                                           onMouseDownHandler={() => onMouseDownHandler(index)}
                                                  allRefs={{ shapeRef, rotateButtonContainerRef }}/>)}
            </div>
        </div>
    );
}

export default Canvas;