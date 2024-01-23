import React, {useEffect, useMemo, useState} from 'react';
import Draggable, { DraggableData } from "react-draggable";
import useComponentVisible from './customHooks/useComponentVisible';
import {ReactComponent as RotateShapeIcon} from "./svgElements/interfaceElements/RotateShapeIcon.svg";
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = (props) => {
    /**
     * Хранит и устанавливает стиль элемента электрической цепи.
     */
    const [style, setStyle] = useState("");

    /**
     * Хранит и устанавливает текущие координаты элемента электрической цепи.
     */
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    /**
     * Задает элементу начальные координаты, если он был добавлен с помощью перетаскивания.
     */
    useMemo(()=>{
        if (props.isDragged) {
            setCurrentPosition({x: props.shapeDropPosition.x, y: props.shapeDropPosition.y});
        }
    }, [])
    
    /**
     * Устанавливает стартовый стиль элемента.
     */
    useEffect(() => {
        setIsComponentVisible(true);
    }, []);

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
    const onDragHandler = (event: MouseEvent, data: DraggableData) => {
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
    const OnDragStopHandler  = (event: MouseEvent, data: DraggableData) => {
        setIsComponentVisible(true);
        setStyle("shape");
        
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: props.setOnGrid(data.x, 20), y: props.setOnGrid(data.y, 20)});
        }
        
        props.increasePatternSize(data.y, 'height', 'clientHeight', 90);
        props.increasePatternSize(data.x, 'width', 'clientWidth', 240);
    }
    
    const onClickHandler = () => {
        setIsComponentVisible(true);
    }

    const onClickRotateButtonHandler = () => {
        setIsComponentVisible(true);
        setStyle("shape-focus");
    }
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={onDragHandler} 
                   onStop ={OnDragStopHandler}>
            <div className="shape-container"> 
                {isComponentVisible && (<RotateShapeIcon ref={ref} className="rotateButton" onClick={onClickRotateButtonHandler}/>)}
                <div className={style} ref={ref} onClick={onClickHandler}>
                    {props.post.body}
                </div>
            </div>
        </Draggable>
    );
}

export default Shape;