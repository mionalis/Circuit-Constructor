import React, {Component, useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {Footer} from "./components/Footer";
import Toolbar from "./components/Toolbar";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {ReactComponent as Resistor} from "./components/svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./components/svgElements/circuitElements/Capacitor.svg";
import {ReactComponent as Inductor} from "./components/svgElements/circuitElements/Inductor.svg";
import Shape from "./components/Shape";

function App(props) {

    const [shapes, setShapes] = useState([
        {id: 1, body: <Resistor/>},
        {id: 2, body: <Capacitor/>},
        {id: 3, body: <Inductor/>},
    ])

    const pull_data = (data) => {
        console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
              <Toolbar func={setShapes}/>
              <div className="right-panel">
                <div className="canvas-container">
                    <TopMenu/>
                    
                    <div className="canvas">
                        <div className="dot-pattern-canvas ">
                            {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
                        </div>
                    </div>
                    
                </div>
               <PagesPanel/>
              </div>
            </div>
          <Footer/>
        </div>
    );
}

export default App;