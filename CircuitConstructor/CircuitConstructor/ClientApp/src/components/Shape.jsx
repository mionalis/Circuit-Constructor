import React, {useEffect, useMemo, useState} from 'react';
import Draggable, { DraggableData } from "react-draggable";
import useComponentVisible from '../hooks/useComponentVisible';
import RotateButton from './RotateButton';

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = React.forwardRef((props, ref) => {
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
        if (props.isDraggedFromSidebar) {
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
     * Устанавливает стиль для элемента цепи, если он выбран пользователем.
     */
    useEffect(() => {
        if (isComponentVisible) {
            ref.current.classList.add("shape-focus");
        }
        else {
            ref.current.classList.remove("shape-focus");
        }
    }, [isComponentVisible]);
    
    /**
     * Срабатывает при перемещении элемента по Canvas.
     * @param event
     * @param data
     */
    const handleShapeDrag = (event: MouseEvent, data: DraggableData) => {
        setIsComponentVisible(false);
        ref.current.classList.add("shape-on-drag");
        
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
        ref.current.classList.remove("shape-on-drag");

        if (data.x < 0 && data.y < 0) {
            return;
        }
        
        let gridStep = 20;
        if (Math.abs(props.rotateButtonAngle) === 90 || 
            Math.abs(props.rotateButtonAngle) === 270) {
            gridStep = 10;
        }
        
        setCurrentPosition({x: props.setOnGrid(data.x, gridStep), y: props.setOnGrid(data.y, gridStep)});

        const triggerZoneHeight = 90;
        const triggerZoneWidth = 240;
        props.increasePatternSize(data.y, 'height', 'clientHeight', triggerZoneHeight);
        props.increasePatternSize(data.x, 'width', 'clientWidth', triggerZoneWidth);
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
                    <div className="shape"
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