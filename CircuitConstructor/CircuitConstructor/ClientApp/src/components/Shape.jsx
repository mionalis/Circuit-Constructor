import React from 'react';
import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = React.forwardRef((props, ref) => {
    return (
        <div className="shape" ref={ref}>
            {props.post.body}
        </div>
    );
});

export default Shape;