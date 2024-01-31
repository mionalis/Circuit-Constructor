import React from 'react';
import {ReactComponent as SaveFileIcon} from "../assets/interfaceElements/SaveFileIcon.svg";
import {ReactComponent as UploadFileIcon} from "../assets/interfaceElements/UploadFileIcon.svg";

/**
 * Верхняя панель с кнопками сохранения и загрузки.
 */
const TopMenu = () => {
    return (
        <div className="top-panel">
            <button className="top-panel-button">
                <SaveFileIcon />
            </button>
            <button className="top-panel-button">
                <UploadFileIcon />
            </button>
        </div>
    );
}

export default TopMenu;