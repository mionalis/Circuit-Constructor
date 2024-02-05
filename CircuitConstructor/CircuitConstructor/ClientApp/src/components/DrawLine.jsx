import React from "react";
import Line from "./Line";
import ChangeLineButton from "./ChangeLineButton";

const DrawLine = (line, index, handleLineMouseDown) => {
    const { start, end, isOppositeDirection, isVertical } = line;

    const commonProps = {
        x: end.x,
        y: end.y,
        handleLineMouseDown: () => handleLineMouseDown(index),
    };

    if (isVertical || !isOppositeDirection) {
        return (
            <React.Fragment key={index}>
                <Line
                    start={{ x: start.x, y: start.y }}
                    end={{ x: end.x, y: start.y }}
                />
                <Line 
                    start={{ x: end.x, y: start.y }} 
                    end={{ x: end.x, y: end.y }} 
                />
                <ChangeLineButton {...commonProps} />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment key={index}>
                <Line
                    start={{ x: start.x, y: start.y }}
                    end={{ x: start.x, y: end.y }}
                />
                <Line
                    start={{ x: start.x, y: end.y }}
                    end={{ x: end.x, y: end.y }} 
                />
                <ChangeLineButton {...commonProps} />
            </React.Fragment>
        );
    }
};

export default DrawLine;
