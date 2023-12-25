import React, { Component } from 'react';
import './custom.css';
import "./components/styles/mainContentStyles.css";
import {Footer} from "./components/Footer";
import {Toolbar} from "./components/Toolbar";
import {Canvas} from "./components/Canvas";
import {TopMenu} from "./components/TopMenu";
import {PagesPanel} from "./components/PagesPanel";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <div className="main-container">
            <div className="content-container">
              <Toolbar/>
              <div className="right-panel">
                <div className="canvas-container">
                    <TopMenu/>
                    <Canvas/>
                </div>
               <PagesPanel/>
              </div>
            </div>
          <Footer/>
        </div>
    );
  }
}
