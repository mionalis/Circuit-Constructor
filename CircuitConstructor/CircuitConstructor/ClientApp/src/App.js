import React, {useRef, useState} from 'react';
import TopMenu from "./components/TopMenu";
import PagesPanel from "./components/PagesPanel";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import './custom.css';
import "./styles/mainContentStyles.css";
import "./styles/colors.css";

/**
 * Главный компонент, агрегирует в себе все компоненты приложения. 
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const canvasRef = useRef(null);
    
    /**
     * Хранит и устанавливает массив элементов электрической цепи.
     */
    const [shapes, setShapes] = useState([]);

    /**
     * Хранит и устанавливает булевое значение, которое определяет, возможен ли дроп элемента при перетаскивании. 
     */
    const [isCanBeDropped, setIsCanBeDropped] = useState(false);

    /**
     * Хранит и устанавливает булевое значение, которое определяет, был ли элемент добавлен на Canvas 
     * при помощи перетаскивания.
     */
    const [isDragged, setIsDragged] = useState(false);

    /**
     * Хранит и устанавливает координаты элемента после перетаскивания.
     */
    const [shapeDropPosition, setShapeDropPosition] = useState({});

    /**
     * Создает элемент электрической цепи и добавляет его в массив.
     * @param shapeType - Тип добавляемой фигуры.
     */
    const createNewShape = (shapeType) => {
        const newShape = {
            id: Date.now(),
            body: shapeType
        };
        
        setShapes([...shapes, newShape]);
    }

    /**
     * Срабатывает, когда пользователь начинает перетаскивать элемент из Sidebar.
     * @param event
     * @param shapeType - Тип элемента.
     */
    const handleDragStartFromSidebar = (event, shapeType) => {
        setGhostDragImage(event, shapeType);
    }

    /**
     * Срабатывает, когда перетаскиваемый элемент входит на Canvas. 
     */
    const handleCanvasDragEnter = (event) => {
        event.preventDefault();
        setIsCanBeDropped(true);
        setShapesPointerEvents(true);
    }
    
    /**
     * Срабатывает, когда перетаскиваемый элемент покидает Canvas.
     */
    const handleCanvasDragLeave = (event) => {
        event.preventDefault();
        setIsCanBeDropped(false);
        setShapesPointerEvents(false);
    }
    
    /**
     * Срабатывает, когда пользователь заканчивает перетаскивать элемент из Sidebar на Canvas.
     * @param event
     * @param shapeType - Тип выбранной фигуры.
     */
    const handleDragEndFromSidebar = (event, shapeType) => {
        if (!isCanBeDropped) {
            return;
        }

        setShapesPointerEvents(false);
        createNewShape(shapeType);
        setIsCanBeDropped(false);
        setIsDragged(true);

        const canvas = canvasRef.current;
        
        const x = setOnGrid(event.clientX - canvas.offsetLeft + canvas.scrollLeft, 20);
        const y = setOnGrid(event.clientY - canvas.offsetTop + canvas.scrollTop, 20);
        setShapeDropPosition({x: x, y: y});
    }

    /**
     * Устанавливает изображение, показываемое при перетаскивании фигуры.
     * @param event
     * @param shapeType - Тип элемента.
     */
    const setGhostDragImage = (event, shapeType) => {
        const button = document.getElementById("shape-button");
        const icon = document.getElementById(shapeType);
        const ghostDragImage = icon.cloneNode(true);

        ghostDragImage.classList.add("ghost-drag-image");
        
        button.appendChild(ghostDragImage);
        event.dataTransfer.setDragImage(ghostDragImage, 0, 0);

        window.setTimeout(function() {
            ghostDragImage.parentNode.removeChild(ghostDragImage);
        }, 0);
    }

    /**
     * Вычислияет значение координаты, которое впишется в сетку с заданным шагом.
     * @param coordinateValue - Значение координаты.
     * @param gridStep - Шаг сетки.
     * @returns {number} - Значение координаты, вписываемое в сетку.
     */
    const setOnGrid = (coordinateValue, gridStep)  => {
        return Math.round(coordinateValue / gridStep) * gridStep;
    }
    
    /**
     * Манипулирует со свойством pointer-events элемента цепи.
     * @param isDisable - Булевое значение. Если метод принимает значение True, то устанавливает в стиль элементов
     * цепи свойство pointer-events: none, запрещая события мыши.
     * Если False - удаляет из стиля элементов цепи свойство pointer-events: none, разрешая события мыши.
     */
    const setShapesPointerEvents = (isDisable) => {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((element) => {
            if (isDisable) {
                element.classList.add('shape-pointer-events-disable');
            } 
            else {
                element.classList.remove('shape-pointer-events-disable');
            }
        });
    };
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar setIsDragged={setIsDragged}
                         createNewShape={createNewShape}
                         handleDragStartFromSidebar={handleDragStartFromSidebar}
                         handleDragEndFromSidebar={handleDragEndFromSidebar} />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu />
                        <Canvas canvasRef={canvasRef}
                                shapes={shapes}
                                isDragged={isDragged}
                                shapeDropPosition={shapeDropPosition}
                                handleCanvasDragEnter={handleCanvasDragEnter}
                                handleCanvasDragLeave={handleCanvasDragLeave}
                                setOnGrid={setOnGrid} />
                    </div>
                    <PagesPanel />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;