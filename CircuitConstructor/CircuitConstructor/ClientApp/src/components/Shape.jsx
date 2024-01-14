import React, {useEffect, useState} from 'react';
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = React.forwardRef(({post, bb}, ref) => {

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        bb(startX, startY, lastX, lastY);
        console.log('child' + startX);
        console.log('child' + startY);
    }, [startX, startY, lastX, lastY])
    
    return (
        <div className="shape" ref={ref}>
            {post.body}
        </div>
    );
});

export default Shape;