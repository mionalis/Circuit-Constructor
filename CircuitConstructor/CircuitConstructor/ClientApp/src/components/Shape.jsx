import React, {useEffect, useMemo, useState} from 'react';
import Draggable, { DraggableData } from "react-draggable";
import useComponentVisible from './customHooks/useComponentVisible';
import RotateButton from './RotateButton';
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = React.forwardRef((props, ref) => {
    /**
     * Хранит и устанавливает стиль элемента электрической цепи.
     */
    const [style, setStyle] = useState("");

    /**
     * Хранит и устанавливает текущие координаты элемента электрической цепи.
     */
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});

    /**
     * Использование хука, который показывает компонент при клике на элемент и
     * скрывает его при клике за пределами элемента.
     */
    const { componentRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    
    /**
     * Задает элементу начальные координаты, если он был добавлен с помощью перетаскивания.
     */
    useMemo(()=>{
        if (props.isDragged) {
            setCurrentPosition({x: props.shapeDropPosition.x, y: props.shapeDropPosition.y});
        }
    }, []);
    
    /**
     * Устанавливает видимость кнопки вращения.
     */
    useEffect(() => {
        setIsComponentVisible(true);
    }, []);

    /**
     * Устанавливает стиль для элемента цепи.
     */
    useEffect(() => {
        if (isComponentVisible) {
            setStyle("shape-focus");
        }
        else {
            setStyle("shape");
        }
    }, [isComponentVisible]);
    
    /**
     * Срабатывает при перемещении элемента по Canvas.
     * @param event
     * @param data
     */
    const handleShapeDrag = (event: MouseEvent, data: DraggableData) => {
        setIsComponentVisible(false);
        setStyle("shape-on-drag");
        
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: data.x, y: data.y});
        }
    }

    /**
     * Срабатывает, когда пользователь заканчивает перемещение элемента по Canvas.
     * @param event
     * @param data
     * @constructor
     */
    const handleShapeDragStop  = (event: MouseEvent, data: DraggableData) => {
        setIsComponentVisible(true);
        setStyle("shape");
        
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: props.setOnGrid(data.x, 20), y: props.setOnGrid(data.y, 20)});
        }
        
        props.increasePatternSize(data.y, 'height', 'clientHeight', 90);
        props.increasePatternSize(data.x, 'width', 'clientWidth', 240);
    }

    /**
     * Срабатывает при нажатии на элемент цепи.
     */
    const handleShapeClick = () => {
        setIsComponentVisible(true);
    }
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={handleShapeDrag} 
                   onStop ={handleShapeDragStop}
                   disabled={props.isDragDisabled}>
            <div className="shape-container"> 
                {isComponentVisible && (
                    <RotateButton componentRef={componentRef}
                                  isComponentVisible={isComponentVisible}
                                  setIsDragDisabled={props.setIsDragDisabled}
                                  setThisCanRotate={props.setThisCanRotate}
                                  rotateButtonContainerRef={props.rotateButtonContainerRef} 
                                  handleRotateButtonContainerMouseDown={props.handleRotateButtonContainerMouseDown} 
                                  handleRotateButtonMouseDown={props.handleRotateButtonMouseDown} 
                                  handleRotateButtonMouseEnter={props.handleRotateButtonMouseEnter} 
                                  handleRotateButtonMouseLeave={props.handleRotateButtonMouseLeave}
                                  rotateButtonAngle={props.rotateButtonAngle} />)}
                <span ref={componentRef}>
                    <div className={style}
                         id="shape"
                         ref={ref} 
                         onClick={handleShapeClick}>
                        {props.post.body}
                    </div>
                </span>
            </div>
        </Draggable>
    );
})

export default Shape;