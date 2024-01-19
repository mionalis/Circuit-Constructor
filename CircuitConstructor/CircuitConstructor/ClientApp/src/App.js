import React, {useEffect, useState} from 'react';
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
     * Хранит и устанавливает элемент электрической цепи.
     */
    const [shape, setShape] = useState({body: null})
    
    /**
     * Хранит и устанавливает массив элементов электрической цепи.
     */
    const [shapes, setShapes] = useState([]);

    const [isCanBeDropped, setIsCanBeDropped] = useState(false);
    
    const [isDragged, setIsDragged] = useState(false);

    const [canvasOffset, setCanvasOffset] = useState({});

    const [shapeDropPosition, setShapeDropPosition] = useState({});
    
    /**
     * Добавляет элемент электрической цепи в массив.
     * @param newShape - Добавляемый элемент электрической цепи.
     */
    const addNewShape = (newShape) => {
        setShapes([...shapes, newShape]);
    }
    
    /**
     * Вызывает createNewShape перед отрисовкой элемента на монтажной поверхности.
     */
    useEffect(() => {
        createNewShape()
    }, [shape])

    /**
     * Создает элемент и передает его в комнонент App.
     */
    const createNewShape = () => {
        const newShape = {
            id: Date.now(),
            ...shape
        }
        addNewShape(newShape)
    }

    const getShapeFromSidebar = () => {
        setIsDragged(false);
        setShape(shape);
    }

    const onDragStartHandler = (event) => {
        let button = document.getElementById("shape-button");
        let icon = document.getElementById("resistor");
        let ghostDragImage = icon.cloneNode(true);
        button.appendChild(ghostDragImage);
        event.dataTransfer.setDragImage(ghostDragImage, 0, 0);

        window.setTimeout(function() {
            ghostDragImage.parentNode.removeChild(ghostDragImage);
        }, 10);
    }

    const onDragEnterHandler = () => {
        setIsCanBeDropped(true);
    }
    
    const onDragEndHandler = (event, shapeType) => {
        if (!isCanBeDropped) {
            return;
        }
        
        setShape(shapeType);
        setIsCanBeDropped(false);
        setIsDragged(true);
        let x = Math.round((event.clientX - canvasOffset.x) / 20) * 20;
        let y = Math.round((event.clientY -  canvasOffset.y) / 20) * 20;
        setShapeDropPosition({x: x, y: y});
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar onDragEndHandler={onDragEndHandler}
                         onDragStartHandler={onDragStartHandler}
                         setShape={setShape}
                         getShapeFromSidebar={getShapeFromSidebar} />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu />
                        <Canvas shapes={shapes}
                                onDragEnterHandler={onDragEnterHandler}
                                thisFromSidebar={isDragged}
                                defaultPosition={shapeDropPosition}
                                setCanvasWidth={setCanvasOffset} />
                    </div>
                    <PagesPanel />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;