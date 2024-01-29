import {ReactComponent as RotateShapeIcon} from "../assets/interfaceElements/RotateShapeIcon.svg";
import React, {useEffect} from "react";

/**
 * Кнопка вращения элемента.
 * @param {number} props.rotateButtonAngle - Угол поворота элемента.
 * @param {boolean} props.isComponentVisible - Опрделеяет видимость элемента.
 * @param {React.Ref} props.rotateButtonContainerRef - Ссылка на контейнер, содержащий кнопку вращения.
 * @param {function} props.handleRotateButtonContainerMouseDown - Срабатывает, когда пользователь нажимает кнопкой
 * мыши по элементу или кнопке вращения. Используется для получения вращаемого элемента.
 * @param {function} props.setIsDragDisabled - Устанавливает значение, которое определяет, выключена ли возможность
 * перетаскивать элемент по рабочей поверхности.
 * @param {function} props.setThisCanRotate - Устанавливает возможность поворачивать элемент.
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

    /**
     * Срабатывает при нажатии мыши по кнопке вращения элемента.
     */
    const handleRotateButtonMouseDown = () => {
        props.setThisCanRotate(true);
    }

    /**
     * Срабатывает при наведении мыши на кнопку вращения элемента.
     */
    const handleRotateButtonMouseEnter = () => {
        props.setIsDragDisabled(true);
    }

    /**
     * Срабатывает, когда мышь покидает кнопку вращения элемента.
     */
    const handleRotateButtonMouseLeave = () => {
        props.setIsDragDisabled(false);
    }
    
    return (
        <div className="rotate-button-container"
             ref={(e) => 
                {props.rotateButtonContainerRef.current = e; props.componentRef.current = e}}
             onMouseDown={props.handleRotateButtonContainerMouseDown}>
            <RotateShapeIcon className="rotateButton" 
                             onMouseDown={handleRotateButtonMouseDown} 
                             onMouseEnter={handleRotateButtonMouseEnter} 
                             onMouseLeave={handleRotateButtonMouseLeave} />
        </div>
    );
};

export default RotateButton;