import React, {useEffect, useMemo, useRef, useState} from 'react';
import Draggable, { DraggableData } from "react-draggable";
import useComponentVisible from '../hooks/useComponentVisible';
import RotateButton from './RotateButton';
import {ReactComponent as DrawLineButton}  from '../assets/interfaceElements/Triangle.svg'

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param {React.Ref} ref - Ссылка на текущий элемент цепи.
 * @param {React.Ref} props.rotateButtonContainerRef - Ссылка на контейнер, содержащий кнопку вращения.
 * @param {React.Ref} props.canvasGridStep - Шаг разметки монтажной поверхности.
 * @param {Object} props.shape - Элемент электрической цепи.
 * @param {number} props.key - Ключ элемента электрической цепи.
 * @param {number} props.rotateButtonAngle - Угол поворота элемента.
 * @param {{ x: number, y: number }} props.shapeDropPosition - Координаты элемента, которые будут установлены
 * после перетаскивания.
 * @param {boolean} props.isDraggedFromSidebar - Определяет, был ли элемент добавлен на рабочую область 
 * перетаскиванием из боковой панели.
 * @param {boolean} props.thisCanRotate - Определяет, может ли элемент поворачиваться.
 * @param {boolean} props.isDragDisabled - Определяет, выключена ли возможность перетаскивать элемент
 * по рабочей поверхности.
 * @param {function} props.setThisCanRotate - Устанавливает возможность поворачивать элемент.
 * @param {function} props.setIsDragDisabled - Устанавливает значение, которое определяет, выключена ли возможность
 * перетаскивать элемент по рабочей поверхности.
 * @param {function} props.increasePatternSize - Увеличивает размер рабочей поверхности.
 * @param {function} props.handleRotateButtonContainerMouseDown - Срабатывает, когда пользователь нажимает кнопкой 
 * мыши по элементу или кнопке вращения. Используется для получения вращаемого элемента.
 * @param {function} props.setOnGrid - Устанавливает элемент по сетке.
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
    
    const shapeContainerRef = useRef();

    const drawLineLeftButtonRef = useRef();
    
    const drawLineRightButtonRef = useRef();
    
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
     * Устаналивает элемент по сетке при повороте.
     */
    useEffect(() => {
        if (isVerticalRotation(props.rotateButtonAngle)) {
            shapeContainerRef.current.style.left = `${10}px`;
            shapeContainerRef.current.style.top = `${10}px`;
        }
        else {
            shapeContainerRef.current.style.left = 0;
            shapeContainerRef.current.style.top = 0;
        }
    }, [props.thisCanRotate])
    
    /**
     * Устанавливает стиль для элемента цепи, если он выбран пользователем.
     */
    useEffect(() => {
        if (isComponentVisible) {
            ref.current.classList.add("shape-focus");
        }
        else {
            ref.current.classList.remove("shape-focus");
            drawLineLeftButtonRef.current.style.visibility = 'hidden';
            drawLineRightButtonRef.current.style.visibility = 'hidden';
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
        drawLineLeftButtonRef.current.style.visibility = 'hidden';
        drawLineRightButtonRef.current.style.visibility = 'hidden';
        
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
        drawLineLeftButtonRef.current.style.visibility = 'visible';
        drawLineRightButtonRef.current.style.visibility = 'visible';

        if (data.x < 0 && data.y < 0) {
            return;
        }
        
        setCurrentPosition({
            x: props.setOnGrid(data.x, props.canvasGridStep),
            y: props.setOnGrid(data.y, props.canvasGridStep)
        });

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
    
    const handleShapeMouseOver = () => {
        drawLineLeftButtonRef.current.style.visibility = 'visible';
        drawLineRightButtonRef.current.style.visibility = 'visible';
    }

    const handleShapeMouseLeave = () => {
        drawLineLeftButtonRef.current.style.visibility = 'hidden';
        drawLineRightButtonRef.current.style.visibility = 'hidden';
    }

    const handleDrawLineMouseOver = () => {
        props.setIsDragDisabled(true);
    }

    const handleDrawLineMouseLeave = () => {
        props.setIsDragDisabled(false);
    }
    
    /**
     * Определяет, повернут ли элемент на 90 градусов.
     * @param angle - Угол поворота в градусах.
     * @returns {boolean} - Если True - элемент вертикален, если False - размещен горизонтально.
     */
    const isVerticalRotation = (angle) => {
        return Math.abs(angle) === 90 || Math.abs(angle) === 270;
    };
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={handleShapeDrag} 
                   onStop ={handleShapeDragStop}
                   disabled={props.isDragDisabled}>
            <div className="shape-container" ref={shapeContainerRef}> 
                {isComponentVisible && (
                    <RotateButton componentRef={componentRef}
                                  isComponentVisible={isComponentVisible}
                                  isVerticalRotation={isVerticalRotation}
                                  thisCanRotate={props.thisCanRotate}
                                  setIsDragDisabled={props.setIsDragDisabled}
                                  setThisCanRotate={props.setThisCanRotate}
                                  rotateButtonContainerRef={props.rotateButtonContainerRef} 
                                  handleRotateButtonContainerMouseDown={props.handleRotateButtonContainerMouseDown}
                                  rotateButtonAngle={props.rotateButtonAngle} />)}
                <span onClick={handleShapeClick}>
                    <div className="triangle-buttons-container" onMouseOver={handleShapeMouseOver}
                         onMouseLeave={handleShapeMouseLeave}>
                        <DrawLineButton className="triangle-button left-button" ref={drawLineLeftButtonRef}
                                        onMouseOver={handleDrawLineMouseOver} 
                                        onMouseLeave={handleDrawLineMouseLeave} />
                        <DrawLineButton className="triangle-button right-button"
                                        onMouseOver={handleDrawLineMouseOver}
                                        onMouseLeave={handleDrawLineMouseLeave} ref={drawLineRightButtonRef} />
                    </div>
                    <div className="shape"
                         id="shape"
                         ref={ref}>
                        {props.shape.body}
                    </div>
                </span>
            </div>
        </Draggable>
    );
})

export default Shape;