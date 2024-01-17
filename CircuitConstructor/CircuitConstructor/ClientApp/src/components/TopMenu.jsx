import React, {Component, useEffect, useRef} from 'react';
import "./styles/mainContentStyles.css";
import {ReactComponent as SaveFileIcon} from "./svgElements/interfaceElements/SaveFileIcon.svg";
import {ReactComponent as UploadFileIcon} from "./svgElements/interfaceElements/UploadFileIcon.svg";

/**
 * Верхняя панель с кнопками сохранения и загрузки.
 */
const TopMenu = (props) => {

    const ref = useRef(null);

    useEffect(() => {
        props.setTopMenuHeight(ref.current.clientHeight);
    })
    
    return (
        <div className="top-panel" ref={ref}>
            <button className="top-panel-button">
                <SaveFileIcon/>
            </button>
            <button className="top-panel-button">
                <UploadFileIcon/>
            </button>
        </div>
    );
}

export default TopMenu;