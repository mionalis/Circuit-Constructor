import React from "react";

const Line = ({ start, end, selected  }) => {
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    let className = 'line';
    if (selected) {
        className = 'line-on-select';
    }

    return (
        <svg className={className}
             width={distance}
             height="2px"
             style={{
                 position: 'absolute',
                 top: `${start.y}px`,
                 left: `${start.x}px`,
                 fill: 'currentColor',
                 transform: `rotate(${angle}deg)`,
                 transformOrigin: '0 0',
             }}>
            <line x1="0" y1="0" x2={distance} y2="0" stroke="currentColor" strokeWidth="4" />
        </svg>
    );
};

export default Line;