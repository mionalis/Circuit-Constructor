import React, {useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {Footer} from "./components/Footer";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {ReactComponent as Resistor} from "./components/svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./components/svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./components/svgElements/circuitElements/Capacitor.svg";

function App() {
    const [shapes, setShapes] = useState([])
    
    const addNewShapes = (newShape) => {
        setShapes([...shapes, newShape])
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
                <Toolbar add={addNewShapes}/>
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