import React, {useState} from "react";

const ChangeLineButton = ({ x, y, handleButtonClick }) => (
    <div
        className="circle-button"
        style={{
            position: 'absolute',
            top: `${y - 5}px`,
            left: `${x - 5}px`,
            cursor: 'pointer',
        }}
        onMouseDown={handleButtonClick}>
    </div>
);

export default ChangeLineButton;