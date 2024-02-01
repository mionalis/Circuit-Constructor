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

    const handleCanvasMouseDown = (event) => {
        handleLineMouseDown(event);
    }
    
    /**
     * Срабатывает при движении мыши по монтажной поверхности.
     * @param event
     */
    const handleCanvasMouseMove = (event) => {
        handleMouseMove(event);
        
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
    const handleCanvasMouseUp = (event) => {
        setThisCanRotate(false);
        handleMouseUp(event);
        
        if (selectedShape === null) {
            return;
        }
        selectedShape.classList.remove("shape-on-drag");
    }

    const [startPoint, setStartPoint] = useState(null);
    const [drawingLine, setDrawingLine] = useState(null);
    const [isLeft, setIsLeft] = useState(false);
    const [connectedLines, setConnectedLines] = useState([]);
    
    const handleMouseDown = (event) => {
        const leftButton = document.getElementById('circle-left-button');
        setIsLeft(false);
        
        if (event.target == leftButton) {
            setIsLeft(true);
        }
        
        setStartPoint({
            selectedShapeIndex,
            x: props.setOnGrid(event.clientX + props.canvasRef.current.scrollLeft - props.canvasRef.current.offsetLeft, 20),
            y: props.setOnGrid(event.clientY + props.canvasRef.current.scrollTop - props.canvasRef.current.offsetTop, 20)
        });
        
    };
    
    const [selectedLine, setSelectedLine] = useState(null);
    
    const handleLineMouseDown = (event) => {
        const mouseX = props.setOnGrid(event.clientX + props.canvasRef.current.scrollLeft - props.canvasRef.current.offsetLeft, 20);
        const mouseY = props.setOnGrid(event.clientY + props.canvasRef.current.scrollTop - props.canvasRef.current.offsetTop, 20)
        
        for (let i = 0; i < connectedLines.length; i++) {
            const line = connectedLines[i];
            const lines = document.querySelectorAll('.line, .line-on-select');
            
            lines.forEach((line) => {
                line.style.color = 'black';
            });
            
            if ((line.start.x <= mouseX && line.end.x >= mouseX) && (mouseY - line.start.y === 0) ||
                (line.start.y >= mouseY && line.end.y <= mouseY) && (mouseX - line.end.x === 0) ||
                (line.start.x >= mouseX && line.end.x <= mouseX) && (mouseY - line.start.y === 0)) {
                setSelectedLine(i);
                line.isSelected = true;
            }
            else {
                line.isSelected = false;
            }
        }
    }
    
    const handleMouseMove = (event) => {
        const mouseX = props.setOnGrid(event.clientX + props.canvasRef.current.scrollLeft - props.canvasRef.current.offsetLeft, 20);
        const mouseY = props.setOnGrid(event.clientY + props.canvasRef.current.scrollTop - props.canvasRef.current.offsetTop, 20)
        
        if (startPoint && !selectedLine) {
            
            const isKinked = Math.abs(mouseX - startPoint.x) > 10 && Math.abs(mouseY - startPoint.y) > 10;
            const isOppositeDirection = (isLeft && startPoint.x - mouseX < 0) || (!isLeft && mouseX - startPoint.x < 0);
            
            setDrawingLine({ start: startPoint, end: { x: mouseX, y: mouseY }, isKinked, isOppositeDirection });
        }

        if (selectedLine !== null) {
            const updatedLines = [...connectedLines];
            const line = updatedLines[selectedLine];
      
            
            if (line.isKinked) {
                line.end.x = mouseX;
                line.end.y = mouseY;
            } else {
                if (mouseX >= line.start.x && mouseX <= line.end.x) {
                    line.isKinked = true;
                }
            }

            setConnectedLines(updatedLines);
        }
    };

    const handleMouseUp = (event) => {
        if (startPoint && !selectedShape && !selectedLine) {
            setConnectedLines([...connectedLines, drawingLine]);
            setDrawingLine(null);
        }
        setStartPoint(null);
        setSelectedShape(null);
        setSelectedLine(null);
    };

    const handleButtonClick = ( position) => {
        console.log(`Button clicked for line at ${position}`);
    };
    
    const drawLine = (line, index) => {
        const { start, end, isKinked, isOppositeDirection, isSelected } = line;
        
        if (isKinked && !isOppositeDirection) {
            return (
                <React.Fragment key={index}>
                    <Line start={{ x: start.x, y: start.y }} end={{ x: end.x, y: start.y }} selected={isSelected} />
                    <Line start={{ x: end.x, y: start.y }} end={{ x: end.x, y: end.y }} selected={isSelected} />
                    <Button
                        x={end.x}
                        y={end.y}
                        onClick={() => handleButtonClick('start')}
                    />
                </React.Fragment>
            );
        } 
        else if (isKinked) {
            return (
                <React.Fragment key={index}>
                    <Line start={{ x: start.x, y: start.y }} end={{ x: start.x, y: end.y }} selected={isSelected} />
                    <Line start={{ x: start.x, y: end.y }} end={{ x: end.x, y: end.y }} selected={isSelected} />
                </React.Fragment>
            );
        }
        else {
            return (
                <Line start={start} end={end} key={index}/>
            );
        }
    };
    
    const Line = ({ start, end, selected  }) => {
        const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
        
        let className = 'line';
        if (selected) {
            className = 'line-on-select';
        }
        
        return (
            <svg className={className}
                 width={distance} 
                 height="2px" 
                 style={{
                     position: 'absolute',
                     top: `${start.y}px`,
                     left: `${start.x}px`,
                     fill: 'currentColor',
                     transform: `rotate(${angle}deg)`,
                     transformOrigin: '0 0',
                }}>
                <line x1="0" y1="0" x2={distance} y2="0" stroke="currentColor" strokeWidth="4" />
            </svg>
        );
    };

    const Button = ({ x, y, onClick }) => (
        <div
            className="circle-button"
            style={{
                position: 'absolute',
                top: `${y - 5}px`,
                left: `${x - 5}px`,
                cursor: 'pointer',
            }}
            onClick={onClick}>
        </div>
    );
    
    return (
        <div className="canvas"  ref={props.canvasRef}>
            <div className="dot-pattern-canvas"
                 ref={dotPatternRef}
                 onDragEnter={props.handleCanvasDragEnter}
                 onDragLeave={props.handleCanvasDragLeave}
                 onMouseDown={handleCanvasMouseDown}
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
                                                           setOnGrid={props.setOnGrid}
                                                           handleMouseDown={handleMouseDown}/>)}
                {connectedLines.map((line, index) => drawLine(line, index))}
                {drawingLine && drawLine(drawingLine, connectedLines.length)}
            </div>
        </div>
    );
}

export default Canvas;