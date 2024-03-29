import React, {createRef, useEffect, useRef, useState} from "react";
import Shape from "./Shape";
import "../styles/canvasStyles.css";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param {React.Ref} props.canvasRef - Ссылка на монтажную поверхность.
 * @param {React.Ref} props.canvasGridStep - Шаг разметки монтажной поверхности.
 * @param {Array} props.shapes - Массив элементов электрической цепи.
 * @param {boolean} props.isDraggedFromSidebar - Определяет, был ли элемент добавлен на Canvas при помощи 
 * перетаскивания из Sidebar.
 * @param {{ x: number, y: number }} props.shapeDropPosition - Координаты элемента, которые будут установлены 
 * после перетаскивания.
 * @param {function} props.handleCanvasDragEnter - Срабатывает, когда перетаскиваемый элемент входит на Canvas. 
 * Устанавливает возможность добавление элемента перетаскиванием. 
 * @param {function} props.handleCanvasDragLeave - Срабатывает, когда перетаскиваемый элемент покидает Canvas. 
 * Убирает возможность добавление элемента перетаскиванием.
 * @param {function} props.setOnGrid - Устанавливает элемент по сетке.
 * @returns {JSX.Element}
 * @constructor
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
     * Хранит и устанавливает индекс выбранного элемента в массиве.
     */
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(0);

    /**
     * Хранит и устанавливает массив, хранящий углы вращения элементов цепи.
     */
    const [rotationAngles, setRotationAngles] = useState({});

    /**
     * Хранит и устанавливает возможность вращать элемент.
     */
    const [thisCanRotate, setThisCanRotate] = useState(false);

    /**
     * Хранит и устанавливает булевое значение, которое определяет, заблокировано ли передвижение элемента.
     */
    const [isDragDisabled, setIsDragDisabled] = useState(false);
    
    /**
     * Меняет иконку возле перетаскиваемого элемента, когда тот заходит на Canvas.
     */
    useEffect(() => {
        dotPatternRef.current.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }, [])

    /**
     * Срабатывает, когда пользователь нажимает кнопкой мыши по элементу или кнопке вращения. Используется для
     * получения вращаемого элемента.
     * @param index - Индекс выбранного элемента в массиве.
     */
    const handleRotateButtonContainerMouseDown = (index) => {
        setSelectedShape(shapeRefs[index].current);
        setSelectedShapeIndex(index);
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
        if(!thisCanRotate || rotateButtonContainerRef.current == null || selectedShape == null) {
           return;
        }

        const newRotationAngles = { ...rotationAngles };
        newRotationAngles[selectedShapeIndex] = handleRotate(event);
        setRotationAngles(newRotationAngles);
        
        selectedShape.style.rotate = `${rotationAngles[selectedShapeIndex]}deg`;
        selectedShape.classList.add("shape-on-drag");
        rotateButtonContainerRef.current.style.rotate = `${rotationAngles[selectedShapeIndex]}deg`;
    }

    /**
     * Осуществляет вращение элемента относительно координат мыши.
     * @param event
     * @returns {*} - Угол вращения элемента в градусах.
     */
    const handleRotate = (event) => {
        const shapeBoundingRect = selectedShape.getBoundingClientRect();
        const shapeCenterX = shapeBoundingRect.left + shapeBoundingRect.width / 2;
        const shapeCenterY = shapeBoundingRect.top + shapeBoundingRect.height / 2;

        const deltaX = event.clientX - window.scrollX - shapeCenterX;
        const deltaY = event.clientY - window.scrollY - shapeCenterY;

        const initialAngle = 150;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - initialAngle;
        
        const rotationStep = 90;
        return props.setOnGrid(angle, rotationStep);
    };

    /**
     * Срабатывает при отпускании кнопки мыши на Canvas.
     */
    const handleCanvasMouseUp = () => {
        setThisCanRotate(false);
        
        if (selectedShape === null) {
            return;
        }

        selectedShape.classList.remove("shape-on-drag");
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
                                                           shape={shape} 
                                                           key={shape.id}
                                                           thisCanRotate={thisCanRotate}
                                                           isDragDisabled={isDragDisabled}
                                                           setThisCanRotate={setThisCanRotate}
                                                           setIsDragDisabled={setIsDragDisabled}
                                                           rotateButtonAngle={rotationAngles[index]}
                                                           increasePatternSize={increasePatternSize}
                                                           handleRotateButtonContainerMouseDown={() => 
                                                               handleRotateButtonContainerMouseDown(index)}
                                                           canvasGridStep={props.canvasGridStep}
                                                           isDraggedFromSidebar={props.isDraggedFromSidebar} 
                                                           shapeDropPosition={props.shapeDropPosition} 
                                                           setOnGrid={props.setOnGrid} />)}
            </div>
        </div>
    );
}

export default Canvas;