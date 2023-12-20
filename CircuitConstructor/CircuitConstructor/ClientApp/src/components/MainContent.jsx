import React, { Component } from 'react';
import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';
import "./styles/mainContentStyles.css";

export class MainContent extends Component {
    static displayName = MainContent.name;

    render() {
        return (
            <div className="content-container">
                <Toolbar/>
                <div className="right-panel">
                    <div className="canvas-container">
                        <div className="top-panel">
                            <button className="top-panel-button">
                                <svg viewBox="0 0 32 32" version="1.1">
                                    <g id="Page-1" stroke="none" fill="none" >
                                        <g id="Icon-Set"  transform="translate(-568.000000, -983.000000)" fill="#000000">
                                            <path d="M598,1011 C598,1012.1 597.104,1013 596,1013 L572,1013 C570.896,1013
                                             570,1012.1 570,1011 L570,987 C570,985.896 570.896,985 572,985 L596,985 
                                             C597.104,985 598,985.896 598,987 L598,1011 L598,1011 Z M596,983 L572,983 
                                             C569.791,983 568,984.791 568,987 L568,1011 C568,1013.21 569.791,1015 
                                             572,1015 L596,1015 C598.209,1015 600,1013.21 600,1011 L600,987 C600,984.791
                                              598.209,983 596,983 L596,983 Z M589.121,999.465 L585,1003.59 L585,993
                                              C585,992.447 584.553,992 584,992 C583.448,992 583,992.447 583,993
                                              L583,1003.59 L578.879,999.465 C578.488,999.074 577.855,999.074
                                              577.465,999.465 C577.074,999.855 577.074,1000.49 577.465,1000.88
                                              L583.121,1006.54 C583.361,1006.78 583.689,1006.85 584,1006.79
                                              C584.311,1006.85 584.639,1006.78 584.879,1006.54 L590.535,1000.88
                                              C590.926,1000.49 590.926,999.855 590.535,999.465 C590.146,999.074
                                              589.512,999.074 589.121,999.465 L589.121,999.465 Z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <button className="top-panel-button">
                                <svg viewBox="0 0 32 32" version="1.1">
                                    <g id="Page-1" stroke="none" fill="none">
                                        <g id="Icon-Set"  transform="translate(-152.000000, -515.000000)" fill="#000000">
                                            <path d="M171,525 C171.552,525 172,524.553 172,524 L172,520 C172,519.447
                                             171.552,519 171,519 C170.448,519 170,519.447 170,520 L170,524 C170,524.553
                                              170.448,525 171,525 L171,525 Z M182,543 C182,544.104 181.104,545 180,545
                                              L156,545 C154.896,545 154,544.104 154,543 L154,519 C154,517.896 154.896,517
                                              156,517 L158,517 L158,527 C158,528.104 158.896,529 160,529 L176,529
                                              C177.104,529 178,528.104 178,527 L178,517 L180,517 C181.104,517 182,517.896
                                              182,519 L182,543 L182,543 Z M160,517 L176,517 L176,526 C176,526.553
                                              175.552,527 175,527 L161,527 C160.448,527 160,526.553 160,526 L160,517
                                              L160,517 Z M180,515 L156,515 C153.791,515 152,516.791 152,519 L152,543
                                              C152,545.209 153.791,547 156,547 L180,547 C182.209,547 184,545.209 184,543
                                              L184,519 C184,516.791 182.209,515 180,515 L180,515 Z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
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
        );
    }
}