import React, {useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {Footer} from "./components/Footer";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

function App() {
    // Хранит и устанавливает массив элементов электрической цепи.
    const [shapes, setShapes] = useState([])
    
    // Добавляет элемент электрической цепи в массив.
    const addNewShape = (newShape) => {
        setShapes([...shapes, newShape])
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Toolbar addNewShape={addNewShape}/>
                <div className="right-panel">
                    <div className="canvas-container">
                        <TopMenu/>
                        <Canvas shapes={shapes}/>
                    </div>
                    <PagesPanel/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;