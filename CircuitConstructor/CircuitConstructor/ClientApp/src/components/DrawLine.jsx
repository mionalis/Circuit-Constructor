import React from "react";
import Line from "./Line";
import ChangeLineButton from "./ChangeLineButton";

const DrawLine = (line, index, handleButtonClick) => {
    const { start, end, isKinked, isOppositeDirection, isVertical } = line;

    const commonProps = {
        x: end.x,
        y: end.y,
        handleButtonClick: () => handleButtonClick(index),
    };
    
    if (isVertical || (isKinked && !isOppositeDirection)) {
        return (
            <React.Fragment key={index}>
                <Line start={{ x: start.x, y: start.y }} end={{ x: end.x, y: start.y }} />
                <Line start={{ x: end.x, y: start.y }} end={{ x: end.x, y: end.y }} />
                <ChangeLineButton {...commonProps} />
            </React.Fragment>
        );
    } else if (isKinked) {
        return (
            <React.Fragment key={index}>
                <Line start={{ x: start.x, y: start.y }} end={{ x: start.x, y: end.y }} />
                <Line start={{ x: start.x, y: end.y }} end={{ x: end.x, y: end.y }} />
                <ChangeLineButton {...commonProps} />
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment key={index}>
                <Line start={start} end={end} key={index} />
                <ChangeLineButton {...commonProps} />
            </React.Fragment>
        );
    }
};

export default DrawLine;