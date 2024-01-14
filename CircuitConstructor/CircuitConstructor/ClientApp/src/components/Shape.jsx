import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, {useEffect, useState} from 'react';
import "./styles/canvasStyles.css";
import Canvas from "./Canvas";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = (({post}) => {
    
    const [currentPosition, setCurrentPosition] = useState({
        xRate: 0,
        yRate: 0,
    });
    
    const onDrag = (e: MouseEvent, data: DraggableData) => {
        setCurrentPosition({ xRate: data.x, yRate: data.y });
    };
    
    return (
        <Draggable
            position={{
                x: currentPosition.xRate,
                y: currentPosition.yRate
            }}
            grid={[20, 20]}
            onDrag={onDrag}>
        
        <div className="shape">
            {post.body}
        </div>
            
        </Draggable>
    );
});

export default Shape;