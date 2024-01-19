import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
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

    useEffect(() => {
        setStyle("shape");
        
        if (props.thisFromSidebar) {
            setCurrentPosition({xRate: props.defaultPosition.x, yRate: props.defaultPosition.y});
        }
    }, [])
    
    const [currentPosition, setCurrentPosition] = useState({
        xRate: 0,
        yRate: 0,
    });
    
    const onDrag = (e: MouseEvent, data: DraggableData) => {
        setStyle("shape-on-drag");
        if (data.x >= 0 && data.y >= 0) {
            setCurrentPosition({xRate: data.x, yRate: data.y});
        }
    };
    
    const onStop  = () => {
        setStyle("shape");
    }
    
    return (
        <Draggable position={{
            x: currentPosition.xRate,
            y: currentPosition.yRate}} 
                   grid={[20, 20]} 
                   onDrag={onDrag} 
                   onStop ={onStop}>
            <div className={style}>
                {props.post.body}
            </div>
        </Draggable>
    );
});

export default Shape;