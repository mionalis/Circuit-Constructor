import React, {Component, useState} from 'react';
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import Shape from "./Shape";
import "./styles/canvasStyles.css";

const Canvas = () => {
    
    const [shapes, setShapes] = useState([
        {id: 1, body: <Resistor/>},
        {id: 1, body: <Capacitor/>},
        {id: 1, body: <Inductor/>},
    ])
    
    return (
        <div className="canvas">
            <div className="dot-pattern-canvas ">
                {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
            </div>
        </div>
    );
}

export default Canvas;