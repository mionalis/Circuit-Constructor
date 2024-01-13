import "./styles/canvasStyles.css";
import Shape from "./Shape";
import React, {useEffect, useRef} from "react";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param shapes - Массив элементов электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 */
const Canvas = ({shapes}) => {
    const shapeRef = useRef(null)
    const canvasRef = useRef(null)
    
    useEffect( () => {
        if(!shapeRef.current || !canvasRef.current) return;
        const shape = shapeRef.current;
        
        const onMouseDown = () => {
            console.log('clicked');
        }
        
        shape.addEventListener('mousedown', onMouseDown);
    }, [shapes])
    
    
    return (
        <div className="canvas">
            <div className="dot-pattern-canvas-container">
                <div className="dot-pattern-canvas" ref={canvasRef}>
                    {shapes.map(shape => <Shape post={shape} key={shape.id} ref={shapeRef}/>)}
                </div>
            </div>
        </div>
    );
}

export default Canvas;