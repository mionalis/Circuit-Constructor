import React, { Component } from 'react';
import "./styles/toolbarStyles.css";
import $ from 'jquery';

export class Toolbar extends Component {
    static displayName = Toolbar.name;
    
    componentDidMount() {
        $('.shape-types-select').click(function () {
            $(this).parent().find('ul li').slideToggle();
        })
    }
    
    render() {
        return (
            <div className="toolbar-container">
                <h3>Shapes</h3>
                <input className="search-shapes-input" placeholder="Search shape"></input>
                <div className="shapes-container">
                   <ul>
                       <li><span className="shape-types-select">Fundamental Items</span>
                           <ul>
                               <li className="shape-button">Resistor</li>
                               <li className="shape-button">Capacitor</li>
                           </ul>
                       </li>
                   </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="shape-button">Some element</li>
                                <li className="shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}