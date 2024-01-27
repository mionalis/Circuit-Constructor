import {ReactComponent as RotateShapeIcon} from "./svgElements/interfaceElements/RotateShapeIcon.svg";
import React, {useEffect} from "react";


/**
 * Кнопка вращения элемента.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const RotateButton = (props) => {

    /**
     * Устанавливает запомненный угол поворота для кнопки вращения элемента.
     */
    useEffect(() => {
        if (props.isComponentVisible) {
            updateRotateAngleOfButton(props.rotateButtonAngle);
        }
    }, [props.isComponentVisible]);

    /**
     * Обновляет угол поворота для кнопки вращения элемента.
     * @param angle - Угол поворота.
     */
    const updateRotateAngleOfButton = (angle) => {
        const rotateButtonContainer = props.rotateButtonContainerRef.current;
        
        if (rotateButtonContainer === null) {
            return;
        }
        
        rotateButtonContainer.style.rotate = `${angle}deg`;
    };
    
    return (
        <div className="rotate-button-container"
             ref={(e) => {props.rotateButtonContainerRef.current = e; props.componentRef.current = e}}
             onMouseDown={props.handleRotateButtonContainerMouseDown}>
            <RotateShapeIcon className="rotateButton" 
                             onMouseDown={props.handleRotateButtonMouseDown} 
                             onMouseEnter={props.handleRotateButtonMouseEnter} 
                             onMouseLeave={props.handleRotateButtonMouseLeave} />
        </div>
    );
};

export default RotateButton;