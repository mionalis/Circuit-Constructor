import Draggable, { DraggableData } from "react-draggable";
import React, {useEffect, useRef, useState} from 'react';
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

    /**
     * Устанавливает стартовый стиль элемента. Задает элементу начальные координаты, если он
     * был добавлен с помощью перетаскивания.
     */
    useEffect(() => {
        setStyle("shape");
        setIsComponentVisible(false);
        
        if (props.isDragged) {
            setCurrentPosition({x: props.shapeDropPosition.x, y: props.shapeDropPosition.y});
        }
    }, []);

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
    }

    const ref = useRef(null);
    
    function useComponentVisible(initialIsVisible) {
        const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsComponentVisible(false);
            }
        };

        useEffect(() => {
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            };
        }, []);

        return { isComponentVisible, setIsComponentVisible };
    }

    const { isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    const onClickHandler = () => {
        setIsComponentVisible(true);
    }
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={onDragHandler} 
                   onStop ={OnDragStopHandler}>
            <div> {isComponentVisible && (<div style={{position:'absolute'}}>Dropdown Component</div>)}
            <div className={style} ref={ref} onClick={onClickHandler}>
                {props.post.body}
            </div>
            </div>
        </Draggable>
    );
}

export default Shape;