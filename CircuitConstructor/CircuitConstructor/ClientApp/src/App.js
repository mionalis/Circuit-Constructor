import React, {useEffect, useRef, useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import "./components/styles/colors.css";
import TopMenu from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {Footer} from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import canvas from "./components/Canvas";

/**
 * Главный компонент, агрегирует в себе все компоненты приложения. 
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    /**
     * Хранит и устанавливает массив элементов электрической цепи.
     */
    const [shapes, setShapes] = useState([])
    
    /**
     * Добавляет элемент электрической цепи в массив.
     * @param newShape - Добавляемый элемент электрической цепи.
     */
    const addNewShape = (newShape) => {
        setShapes([...shapes, newShape])
    }

    const [isCanBeDropped, setIsCanBeDropped] = useState(false);
    const [thisFromSidebar, setThisFromSidebar] = useState(false);

    const [topMenuHeight, setTopMenuHeight] = useState(0);
    const [canvasWidth, setCanvasWidth] = useState(0);
    
    const onDragEnterHandler = (e) => {
        setIsCanBeDropped(true);
    }

    const onDragHandler = (e:MouseEvent) => {
    }

    const [defaultPosition, setDefaultPosition] = useState({
        x: 0,
        y: 0,
    });

    const GetPosition = (x, y) => {
        
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar addNewShape={addNewShape}
                         onDragHandler={onDragHandler}
                         isCanBeDropped={isCanBeDropped}
                         setIsCanBeDropped={setIsCanBeDropped}
                         setThisFromSidebar={setThisFromSidebar}
                         onDragEnter={onDragEnterHandler}
                         setDefaultPosition={setDefaultPosition}
                         GetPosition={GetPosition}
                         topMenuHeight={topMenuHeight}
                         canvasWidth={canvasWidth}
                />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu setTopMenuHeight={setTopMenuHeight}/>
                        <Canvas shapes={shapes} onDragEnterHandler={onDragEnterHandler}
                                thisFromSidebar={thisFromSidebar}
                                setDefaultPosition={setDefaultPosition}
                                defaultPosition={defaultPosition}
                                setCanvasWidth={setCanvasWidth}/>
                    </div>
                    <PagesPanel/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;