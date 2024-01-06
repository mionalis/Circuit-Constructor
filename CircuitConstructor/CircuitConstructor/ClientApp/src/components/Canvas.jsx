import "./styles/canvasStyles.css";
import Shape from "./Shape";
import React from "react";

const Canvas = ({shapes}) => {
    return (
        <div className="canvas">
            <div className="dot-pattern-canvas-container">
                <div className="dot-pattern-canvas">
                    {shapes.map(shape => <Shape post={shape} key={shape.id}/>)}
                </div>
            </div>
        </div>
    );
}

export default Canvas;