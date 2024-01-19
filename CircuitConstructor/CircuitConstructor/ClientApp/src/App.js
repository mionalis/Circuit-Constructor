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
     * Хранит и устанавливает массив элементов электрической цепи.
     */
    const [shapes, setShapes] = useState([]);
    
    /**
     * Добавляет элемент электрической цепи в массив.
     * @param newShape - Добавляемый элемент электрической цепи.
     */
    const addNewShape = (newShape) => {
        setShapes([...shapes, newShape]);
    }

    const [isCanBeDropped, setIsCanBeDropped] = useState(false);
    const [thisFromSidebar, setThisFromSidebar] = useState(false);
    
    const [canvasWidth, setCanvasWidth] = useState({});
    
    const onDragEnterHandler = (e) => {
        setIsCanBeDropped(true);
    }

    const [defaultPosition, setDefaultPosition] = useState({
        x: 0,
        y: 0
    });

    /**
     * Хранит и устанавливает элемент электрической цепи.
     */
    const [shape, setShape] = useState({body: null})
    
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
        setThisFromSidebar(false);
        setShape(shape);
        console.log(shape);
    }

    const onDragEndHandler = (e, shapeType) => {
        if (!isCanBeDropped) {
            return;
        }
        setShape(shapeType);
        setIsCanBeDropped(false);
        setThisFromSidebar(true);
        let u = Math.round((e.clientX - canvasWidth.x) / 20) * 20;
        let b = Math.round((e.clientY -  canvasWidth.y) / 20) * 20 - 20;
        setDefaultPosition({x: u, y: b});
    }

    const onDragStartHandler = (e) => {
        e.dataTransfer.dropEffect = "move";
        let button = document.getElementById("shape-button");
        let icon = document.getElementById("resistor");
        let crt = icon.cloneNode(true);
        document.getElementById("shape-button").appendChild(crt);
        e.dataTransfer.setDragImage(crt, 0, 0);

        window.setTimeout(function() {
            crt.parentNode.removeChild(crt);
        }, 10);
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar
                         onDragEndHandler={onDragEndHandler}
                         onDragStartHandler={onDragStartHandler}
                         setShape={setShape}
                         getShapeFromSidebar={getShapeFromSidebar}
                />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu/>
                        <Canvas shapes={shapes} onDragEnterHandler={onDragEnterHandler}
                                thisFromSidebar={thisFromSidebar}
                                setDefaultPosition={setDefaultPosition}
                                defaultPosition={defaultPosition}
                                setCanvasWidth={setCanvasWidth}/>
                    </div>
                    <PagesPanel />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;