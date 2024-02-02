import React, {useState} from "react";

const ChangeLineButton = ({ x, y, handleLineMouseDown }) => (
    <div
        className="circle-button"
        style={{
            position: 'absolute',
            top: `${y - 5}px`,
            left: `${x - 5}px`,
            cursor: 'pointer',
        }}
        onMouseDown={handleLineMouseDown}>
    </div>
);

export default ChangeLineButton;