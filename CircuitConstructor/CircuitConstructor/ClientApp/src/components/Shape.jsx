import Draggable, { DraggableData } from "react-draggable";
import React, {useEffect, useState} from 'react';
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = ((props) => {

    const [style, setStyle] = useState("");
    const [currentPosition, setCurrentPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        setStyle("shape");
        
        if (props.isDragged) {
            setCurrentPosition({x: props.shapeDropPosition.x, y: props.shapeDropPosition.y});
        }
    }, [])
    
    const onDrag = (event: MouseEvent, data: DraggableData) => {
        setStyle("shape-on-drag");
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({x: data.x, y: data.y});
        }
    };
    
    const onStop  = (event: MouseEvent, data: DraggableData) => {
        setStyle("shape");
        setCurrentPosition({x: props.setOnGrid(data.x, 20), y: props.setOnGrid(data.y, 20)});
    }
    
    return (
        <Draggable position={{x: currentPosition.x, y: currentPosition.y}}
                   onDrag={onDrag} 
                   onStop ={onStop}>
            <div className={style}>
                {props.post.body}
            </div>
        </Draggable>
    );
});

export default Shape;