import React, {useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import "./components/styles/colors.css";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {Footer} from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";

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
    
    const onDragOverHandler = (e) => {

    }

    const onDragLeaveHandler = (e) => {

    }

    const onDragStartHandler = (e) => {
    
    }
    
    const onDragEnterHandler = (e) => {
        setIsCanBeDropped(true);
        console.log('is enter');
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Sidebar addNewShape={addNewShape}
                         onDragOverHandler={onDragOverHandler}
                         onDragLeaveHandler={onDragLeaveHandler}
                         onDragStartHandler={onDragStartHandler}
                         isCanBeDropped={isCanBeDropped}
                         onDragEnter={onDragEnterHandler}
                />
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu/>
                        <Canvas shapes={shapes} onDragEnterHandler={onDragEnterHandler}/>
                    </div>
                    <PagesPanel/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;