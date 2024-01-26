import {ReactComponent as RotateShapeIcon} from "./svgElements/interfaceElements/RotateShapeIcon.svg";
import React, {useEffect} from "react";

const RotateButton = (props) => {
    const updateRotateStyle = (angle) => {
        if (props.rotateButtonContainerRef.current === null) {
            return;
        }
        props.rotateButtonContainerRef.current.style.rotate = `${angle}deg`;
    };

    useEffect(() => {
        if (props.isComponentVisible) {
            updateRotateStyle(props.rotateButtonAngle);
        }
    }, [props.isComponentVisible]);
    
    return (
        <div className="rotate-button-container"
             id="rotate-button-container"
             ref={props.rotateButtonContainerRef}
             onMouseDown={props.onMouseDownHandler}>
            <RotateShapeIcon
                ref={props.componentRef}
                className="rotateButton"
                onMouseDown={props.onMouseDownRotateHandler}
                onMouseEnter={props.onMouseEnterHandler}
                onMouseLeave={props.onMouseLeaveHandler}/>
        </div>
    );
};

export default RotateButton;