import React, {Component, useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {Footer} from "./components/Footer";
import {Toolbar} from "./components/Toolbar";
import Canvas from "./components/Canvas";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {ReactComponent as Resistor} from "./components/svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./components/svgElements/circuitElements/Capacitor.svg";
import {ReactComponent as Inductor} from "./components/svgElements/circuitElements/Inductor.svg";
import Shape from "./components/Shape";

function App() {

    const [shapes, setShapes] = useState([
        {id: 1, body: <Resistor/>},
        {id: 1, body: <Capacitor/>},
        {id: 1, body: <Inductor/>},
    ])
    
    return (
        <div className="main-container">
            <div className="content-container">
              <Toolbar/>
              <div className="right-panel">
                <div className="canvas-container">
                    <TopMenu/>
                   <Canvas/>
                </div>
               <PagesPanel/>
              </div>
            </div>
          <Footer/>
        </div>
    );
}

export default App;