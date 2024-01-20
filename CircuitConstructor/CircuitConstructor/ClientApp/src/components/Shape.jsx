import Draggable, { DraggableData } from "react-draggable";
import React, {useEffect, useState} from 'react';
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = ((props) => {

    /**
     * Хранит и устанавливает стиль элемента электрической цепи.
     */
    const [style, setStyle] = useState("");

    /**
     * Хранит и устанавливает текущие координаты элемента электрической цепи.
     */
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});

    /**
     * Устанавливает стартовый стиль элемента. Задает элементу начальные координаты, если он
     * был добавлен с помощью перетаскивания.
     */
    useEffect(() => {
        setStyle("shape");
        
        if (props.isDragged) {
            setCurrentPosition({x: props.shapeDropPosition.x, y: props.shapeDropPosition.y});
        }
    }, [])

    /**
     * Срабатывает при перемещении элемента по Canvas.
     * @param event
     * @param data
     */
    const onDragHandler = (event: MouseEvent, data: DraggableData) => {
        setStyle("shape-on-drag");
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: data.x, y: data.y});
        }
    };

    /**
     * Срабатывает, когда пользователь заканчивает перемещение элемента по Canvas.
     * @param event
     * @param data
     * @constructor
     */
    const OnDragStopHandler  = (event: MouseEvent, data: DraggableData) => {
        setStyle("shape");
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: props.setOnGrid(data.x, 20), y: props.setOnGrid(data.y, 20)});
        }
    }
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={onDragHandler} 
                   onStop ={OnDragStopHandler}>
            <div className={style}>
                {props.post.body}
            </div>
        </Draggable>
    );
});

export default Shape;