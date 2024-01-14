import React, {useEffect, useRef, useState} from "react";
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

    const [isClicked, setClicked] = useState(false);
    
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const bb = (starttX, starttY, lasttX, lasttY) => {
        setStartX(starttX);
        setStartY(starttY);
        setLastX(lasttX);
        setLastY(lasttY);
        console.log('parent' + startX);
        console.log('parent' + startY);
    }
    
    useEffect( () => {
        if(!shapeRef.current || !canvasRef.current) return;
        
        const shape = shapeRef.current;
        const canvas = canvasRef.current;
        
        const onMouseDown = (e: MouseEvent) => {
            setClicked(true);
            console.log('dowwwn');
            setStartX(e.clientX);
            setStartY(e.clientY);
            console.log(isClicked);
            console.log(startY);
        }

        const onMouseUp = (e: MouseEvent) => {
            setClicked(false);
            setLastX(shape.offsetLeft);
            setLastY(shape.offsetTop);
        }
        
        const onMouseMove = (e: MouseEvent) => {
            if (!isClicked) 
            {
                return;
            }

            console.log("is Move " + isClicked);
            
            const nextX = (e.clientX - startX + lastX);
            const nextY = (e.clientY - startY + lastY);
            
            let a = Math.round(nextX / 20) * 20;
            let b = Math.round(nextY / 20) * 20;

            bb(startX, startY, lastX, lastY);
            
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
        
        return cleanup;
    }, [shapes, startX, startY, lastX, lastY, isClicked])
    
    return (
        <div className="canvas" ref={canvasRef}>
            <div className="dot-pattern-canvas-container">
                <div className="dot-pattern-canvas">
                    {shapes.map(shape => <Shape post={shape} key={shape.id} ref={shapeRef} bb={bb}/>)}
                </div>
            </div>
        </div>
    );
}

export default Canvas;