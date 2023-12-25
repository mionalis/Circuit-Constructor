import React, { Component } from 'react';
import "./styles/mainContentStyles.css";
import {ReactComponent as SaveFileIcon} from "./svgElements/interfaceElements/SaveFileIcon.svg";
import {ReactComponent as UploadFileIcon} from "./svgElements/interfaceElements/UploadFileIcon.svg";

export class TopMenu extends Component {
    static displayName = TopMenu.name;
    render() {
        return (
            <div className="top-panel">
                <button className="top-panel-button">
                    <SaveFileIcon/>
                </button>
                <button className="top-panel-button">
                    <UploadFileIcon/>
                </button>
            </div>
        );
    }
}