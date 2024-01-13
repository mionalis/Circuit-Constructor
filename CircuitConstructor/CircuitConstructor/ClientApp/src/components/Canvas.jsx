import React, {useEffect, useRef} from "react";
import Shape from "./Shape";
import "./styles/canvasStyles.css";

/**
 * Монтажная поверхность. Отрисовывает элементы электрической цепи.
 * @param shapes - Массив элементов электрической цепи.
 * @returns {JSX.Element}
 * @constructor
 */
const Canvas = ({shapes}) => {
    const shapeRef = useRef(null)
    const canvasRef = useRef(null)

    const isClicked = useRef(false);

    const coords = useRef({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    })
    
    useEffect( () => {
        if(!shapeRef.current || !canvasRef.current) return;
        
        const shape = shapeRef.current;
        const canvas = canvasRef.current;
        
        const onMouseDown = (e: MouseEvent) => {
            isClicked.current = true;
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
            console.log("is down " + isClicked.current);
        }

        const onMouseUp = (e: MouseEvent) => {
            isClicked.current = false;
            coords.current.lastX = shape.offsetLeft;
            coords.current.lastY = shape.offsetTop;
            console.log("is up " + isClicked.current);
            console.log(coords.current.lastX);
            console.log(coords.current.lastY);
        }
        
        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked.current) 
            {
                return;
            }

            console.log("is Move " + isClicked.current);
            
            const nextX = (e.clientX - coords.current.startX + coords.current.lastX);
            const nextY = (e.clientY - coords.current.startY + coords.current.lastY);
            
            var a = Math.round(nextX / 20) * 20;
            var b = Math.round(nextY / 20) * 20;
            
            shape.style.top = `${b}px`
            shape.style.left = `${a}px`
        }
        
        shape.addEventListener('mousedown', onMouseDown);
        shape.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        
        const cleanup = () => {
            shape.removeEventListener('mousedown', onMouseDown);
            shape.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mousemove', onMouseMove);
        }
        
    }, [shapes])
    
    return (
        <div className="canvas" ref={canvasRef}>
            <div className="dot-pattern-canvas-container">
                <div className="dot-pattern-canvas">
                    {shapes.map(shape => <Shape post={shape} key={shape.id} ref={shapeRef}/>)}
                </div>
            </div>
        </div>
    );
}

export default Canvas;