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

    const [isCanBeDropped, setIsCanBeDropped] = useState(false);
    
    const [isDragged, setIsDragged] = useState(false);

    const [canvasOffset, setCanvasOffset] = useState({});

    const [shapeDropPosition, setShapeDropPosition] = useState({});

    /**
     * Создает элемент и передает его в комнонент App.
     */
    const createNewShape = (shapeType) => {
        const newShape = {
            id: Date.now(),
            body: shapeType
        };
        
        setShapes([...shapes, newShape]);
    }
    
    const onDragStartHandler = (event) => {
        setGhostDragImage(event);
    }

    const onDragEnterHandler = () => {
        setIsCanBeDropped(true);
    }
    
    const onDragEndHandler = (event, shapeType) => {
        if (!isCanBeDropped) {
            return;
        }

        createNewShape(shapeType);
        setIsCanBeDropped(false);
        setIsDragged(true);
        
        const x = setOnGrid(event.clientX - canvasOffset.x, 20);
        const y = setOnGrid(event.clientY -  canvasOffset.y, 20);
        setShapeDropPosition({x: x, y: y});
    }

    const setGhostDragImage = (event) => {
        const button = document.getElementById("shape-button");
        const icon = document.getElementById("resistor");
        const ghostDragImage = icon.cloneNode(true);

        button.appendChild(ghostDragImage);
        event.dataTransfer.setDragImage(ghostDragImage, 0, 0);

        window.setTimeout(function() {
            ghostDragImage.parentNode.removeChild(ghostDragImage);
        }, 10);
    }
    
    const setOnGrid = (value, gridStep)  => {
        return Math.round(value / gridStep) * gridStep;
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar onDragEndHandler={onDragEndHandler}
                         onDragStartHandler={onDragStartHandler}
                         createNewShape={createNewShape}
                         setIsDragged={setIsDragged}/>
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu />
                        <Canvas shapes={shapes}
                                onDragEnterHandler={onDragEnterHandler}
                                isDragged={isDragged}
                                shapeDropPosition={shapeDropPosition}
                                setCanvasOffset={setCanvasOffset}
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