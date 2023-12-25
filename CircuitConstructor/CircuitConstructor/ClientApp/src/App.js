import React, { Component } from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {Footer} from "./components/Footer";
import {Toolbar} from "./components/Toolbar";
import {Canvas} from "./components/Canvas";
import {ReactComponent as SaveFileIcon} from "./components/svgElements/interfaceElements/SaveFileIcon.svg";
import {ReactComponent as UploadFileIcon} from "./components/svgElements/interfaceElements/UploadFileIcon.svg";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <div className="main-container">
            <div className="content-container">
              <Toolbar/>
              <div className="right-panel">
                <div className="canvas-container">
                  <div className="top-panel">
                    
                    <button className="top-panel-button">
                      <SaveFileIcon></SaveFileIcon>
                    </button>
                    
                    <button className="top-panel-button">
                      <UploadFileIcon></UploadFileIcon>
                    </button>
                    
                  </div>
                  <Canvas/>
                </div>
                <div className="pages-panel">
                  
                  <select multiple className="pages-select" size="1">
                    <option className="page-option">Page 1</option>
                    <option className="page-option">Page 2</option>
                  </select>
                  
                  <button className="add-page-button">+</button>
                  
                </div>
              </div>
            </div>
          <Footer/>
        </div>
    );
  }
}
