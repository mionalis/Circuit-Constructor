import React, {useState} from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";
import {Footer} from "./components/Footer";
import Toolbar from "./components/Toolbar";
import Shape from "./components/Shape";
import {ReactComponent as Resistor} from "./components/svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./components/svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./components/svgElements/circuitElements/Capacitor.svg";

function App() {

    const [shapes, setShapes] = useState([])

    const AddNewResistor = (event) => {
        event.preventDefault()
        const NewResistor= {
            body: <Resistor/>
        }
        setShapes([...shapes, NewResistor])
    }

    const AddNewInductor = (event) => {
        event.preventDefault()
        const NewInductor= {
            body: <Inductor/>
        }
        setShapes([...shapes, NewInductor])
    }
    
    const AddNewCapacitor = (event) => {
        event.preventDefault()
        const NewCapacitor= {
            body: <Capacitor/>
        }
        setShapes([...shapes, NewCapacitor])
    }
    
    return (
        <div className="main-container">
            <div className="content-container">
              <Toolbar AddNewResistor={AddNewResistor}
                       AddNewInductor={AddNewInductor} 
                       AddNewCapacitor={AddNewCapacitor}/>
              <div className="right-panel">
                <div className="canvas-container">
                    <TopMenu/>
                    <div className="canvas">
                        <div className="dot-pattern-canvas-container">
                            <div className="dot-pattern-canvas">
                                {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
                            </div>
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