import React, { Component } from 'react';
import "./styles/toolbarStyles.css";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import $ from 'jquery';

export class Toolbar extends Component {
    static displayName = Toolbar.name;
    
    componentDidMount() {
        $('.shape-types-select').parent().find('ul li').hide();
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
                               <li className="shape-button"><Resistor className="shape-button-icon">
                                    </Resistor>Resistor</li>
                               <li className="shape-button"><Inductor className="shape-button-inductor-icon">
                                    </Inductor>Inductor</li>
                               <li className="shape-button"><Capacitor className="shape-button-icon">
                                    </Capacitor>Capacitor</li>
                           </ul>
                       </li>
                   </ul>
                    <ul>
                        <li><span className="shape-types-select">Other</span>
                            <ul>
                                <li className="some-shape-button">Some element</li>
                                <li className="some-shape-button">Some element</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}