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
    const dotPatternRef = useRef(null);

    /**
     * Ссылка на контейнер, содержащий кнопку вращения.
     * @type {React.MutableRefObject<null>}
     */
    const rotateButtonContainerRef = useRef(null);

    /**
     * Массив, хранящий ссылки на элементы массива shapes.
     */
    const shapeRefs = props.shapes.map(() => createRef());

    /**
     * Хранит и устанавливает выбранный пользователем элемент цепи.
     */
    const [selectedShape, setSelectedShape] = useState(null);

    /**
     * Хранит и устанавливает возможность вращать элемент.
     */
    const [thisCanRotate, setThisCanRotate] = useState(false);

    /**
     * Хранит и устанавливает булевое значение, которое определяет, заблокировано ли передвижение элемента.
     */
    const [isDragDisabled, setIsDragDisabled] = useState(false);

    /**
     * Хранит и устанавливает угол вращения элемента.
     */
    const [rotationAngle, setRotationAngle] = useState(0);

    /**
     * Хранит и устанавливает угол вращения элемента.
     */
    const [rotateButtonAngles, setRotateButtonAngles] = useState({});

    /**
     * Хранит и устанавливает индекс выбранного элемента в массиве.
     */
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(0);
    
    /**
     * Меняет иконку возле перетаскиваемого элемента, когда тот заходит на Canvas.
     */
    useEffect(() => {
        dotPatternRef.current.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])

    /**
     * Срабатывает, когда пользователь нажимает кнопкой мыши по элементу или кнопке вращения.
     * @param index - Индекс выбранного элемента в массиве.
     */
    const handleRotateButtonContainerMouseDown = (index) => {
        setSelectedShape(shapeRefs[index].current);
        setSelectedShapeIndex(index);

        const initialRotationAngle = rotateButtonAngles[index] || 0;
        setRotateButtonAngles(prevAngles => ({
            ...prevAngles,
            [index]: initialRotationAngle,
        }));
    }

    /**
     * Увеличивает размер монтажной поверхности в выбранную сторону и генерирует продолжение для точечной разметки,
     * когда элемент оказывается у края рабочей зоны. 
     * @param coordinate - Координата элемента.
     * @param sideNameProperty - Название аттрибута стороны прямоугольника, передается в кавычках - 'width' или 'height'.
     * @param clientSideNameProperty - Название аттрибута клиентской стороны прямоугольника,
     * передается в кавычках - 'clientWidth' или 'clientHeight'.
     * @param triggerZoneLength - Размер зоны монтажной поверхности в пикселях, при попадании в которую рабочая 
     * зона увеличится в выбранную сторону.
     */
    const increasePatternSize = (coordinate, sideNameProperty, clientSideNameProperty, triggerZoneLength) => {
        let patternSize = dotPatternRef.current[clientSideNameProperty];
        
        if (coordinate > patternSize - triggerZoneLength) {
            patternSize += props.canvasRef.current[clientSideNameProperty] / 3;
            dotPatternRef.current.style[sideNameProperty] = `${patternSize}px`;
        }
    };

    /**
     * Срабатывает при движении мыши по монтажной поверхности.
     * @param event
     */
    const handleCanvasMouseMove = (event) => {
        if(!thisCanRotate) {
           return;
        }
        
        handleRotate(event);
        selectedShape.style.rotate = `${rotationAngle}deg`;
        rotateButtonContainerRef.current.style.rotate = `${rotationAngle}deg`;

        setRotateButtonAngles(previousAngles => ({
            ...previousAngles,
            [selectedShapeIndex]: rotationAngle,
        }));
    }

    /**
     * Осуществляет вращение элемента относительно координат мыши.
     * @param event
     */
    const handleRotate = (event) => {
        const shapeBoundingRect = selectedShape.getBoundingClientRect();
        const shapeCenterX = shapeBoundingRect.left + shapeBoundingRect.width / 2;
        const shapeCenterY = shapeBoundingRect.top + shapeBoundingRect.height / 2;
        
        const deltaX = event.clientX - window.scrollX - shapeCenterX;
        const deltaY = event.clientY - window.scrollY - shapeCenterY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 150;
        const angleOnGrid = props.setOnGrid(angle, 15);
        
        setRotationAngle(angleOnGrid);
    };

    /**
     * Срабатывает при отпускании кнопки мыши на Canvas.
     */
    const handleCanvasMouseUp = () => {
        setThisCanRotate(false);
    }
    
    return (
        <div className="canvas"  ref={props.canvasRef}>
            <div className="dot-pattern-canvas"
                 ref={dotPatternRef}
                 onDragEnter={props.handleCanvasDragEnter}
                 onDragLeave={props.handleCanvasDragLeave}
                 onMouseMove={handleCanvasMouseMove}
                 onMouseUp={handleCanvasMouseUp}>
                {props.shapes.map((shape, index) => <Shape ref={shapeRefs[index]}
                                                           rotateButtonContainerRef={rotateButtonContainerRef}
                                                           post={shape} 
                                                           key={shape.id}
                                                           thisCanRotate={thisCanRotate}
                                                           isDragDisabled={isDragDisabled}
                                                           setThisCanRotate={setThisCanRotate}
                                                           setIsDragDisabled={setIsDragDisabled}
                                                           rotateButtonAngle={rotateButtonAngles[index]}
                                                           increasePatternSize={increasePatternSize}
                                                           handleRotateButtonContainerMouseDown={() => 
                                                               handleRotateButtonContainerMouseDown(index)}
                                                           isDragged={props.isDragged} 
                                                           shapeDropPosition={props.shapeDropPosition} 
                                                           setOnGrid={props.setOnGrid} />)}
            </div>
        </div>
    );
}

export default Canvas;