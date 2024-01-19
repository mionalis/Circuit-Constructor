import React, {useState} from 'react';
import TopMenu from "./components/TopMenu";
import PagesPanel from "./components/PagesPanel";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import './custom.css';
import "./components/styles/mainContentStyles.css";
import "./components/styles/colors.css";

/**
 * Главный компонент, агрегирует в себе все компоненты приложения. 
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
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
     * Срабатывает, когда пользователь начинает перетаскивать элемент.
     * @param event
     * @param shapeType - Тип элемента.
     */
    const onDragStartHandler = (event, shapeType) => {
        console.log(shapeType);
        setGhostDragImage(event, shapeType);
    }

    /**
     * Срабатывает, когда перетаскиваемый элемент входит на Canvas. 
     */
    const onDragEnterHandler = () => {
        setIsCanBeDropped(true);
    }

    /**
     * Срабатывает, когда пользователь заканчивает перетаскивать элемент.
     * @param event
     * @param shapeType - Тип выбранной фигуры.
     */
    const onDragEndHandler = (event, shapeType) => {
        if (!isCanBeDropped) {
            return;
        }

        createNewShape(shapeType);
        setIsCanBeDropped(false);
        setIsDragged(true);

        const canvas = document.getElementById("canvas");
        
        const x = setOnGrid(event.clientX - canvas.offsetLeft, 20);
        const y = setOnGrid(event.clientY - canvas.offsetTop, 20);
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

        ghostDragImage.style.position = "absolute"; 
        ghostDragImage.style.top = "-60px";
        ghostDragImage.style.right = "-60px";
        button.appendChild(ghostDragImage);
        event.dataTransfer.setDragImage(ghostDragImage, 0, 0);

        window.setTimeout(function() {
            ghostDragImage.parentNode.removeChild(ghostDragImage);
        }, 0);
    }

    /**
     * Вычислияет значение координаты, которое впишется в заданную сетку.
     * @param coordinateValue - Значение координаты.
     * @param gridStep - Шаг сетки.
     * @returns {number} - Значение координаты, вписываемое в сетку.
     */
    const setOnGrid = (coordinateValue, gridStep)  => {
        return Math.round(coordinateValue / gridStep) * gridStep;
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar onDragEndHandler={onDragEndHandler}
                         onDragStartHandler={onDragStartHandler}
                         createNewShape={createNewShape}
                         setIsDragged={setIsDragged} />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu />
                        <Canvas shapes={shapes}
                                onDragEnterHandler={onDragEnterHandler}
                                isDragged={isDragged}
                                shapeDropPosition={shapeDropPosition}
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