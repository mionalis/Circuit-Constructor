import React, { Component } from 'react';
import "./styles/canvasStyles.css";

export class Canvas extends Component {
    static displayName = Canvas.name;

    render() {
        return (
            <div className="canvas">
            <div className="dot-pattern-canvas ">

				<svg className="capacitor" width="200" height="22" viewBox="0 0 200 22" fill="none">
					<g clip-path="url(#clip0_5_34)">
						<line y1="21" x2="40" y2="21" stroke="black" stroke-width="2"/>
						<line x1="162" y1="21" x2="200" y2="21" stroke="black" stroke-width="2"/>
						<path d="M75.1259 7.13413C78.6572 10.8336 80.7406 15.7808 80.9773 21H80.9296C80.693 15.8465 78.6348 10.947 75.1248 7.26992C71.3869 3.35408 66.3071 1.145 61 1.145C55.6929 1.145 50.6131 3.35408 46.8752 7.26992C43.3652 10.947 41.307 15.8465 41.0704 21L41.0227 21C41.2594 15.7808 43.3428 10.8336 46.8741 7.13413C50.6288 3.20063 55.7111 1 61 1C66.2889 1 71.3712 3.20063 75.1259 7.13413Z" stroke="black" stroke-width="2"/>
						<path d="M115.126 7.13413C118.657 10.8336 120.741 15.7808 120.977 21H120.93C120.693 15.8465 118.635 10.947 115.125 7.26992C111.387 3.35408 106.307 1.145 101 1.145C95.6929 1.145 90.6131 3.35408 86.8752 7.26992C83.3652 10.947 81.307 15.8465 81.0704 21L81.0227 21C81.2594 15.7808 83.3428 10.8336 86.8741 7.13413C90.6288 3.20063 95.7111 1 101 1C106.289 1 111.371 3.20063 115.126 7.13413Z" stroke="black" stroke-width="2"/>
						<path d="M155.126 7.13413C158.657 10.8336 160.741 15.7808 160.977 21H160.93C160.693 15.8465 158.635 10.947 155.125 7.26992C151.387 3.35408 146.307 1.145 141 1.145C135.693 1.145 130.613 3.35408 126.875 7.26992C123.365 10.947 121.307 15.8465 121.07 21L121.023 21C121.259 15.7808 123.343 10.8336 126.874 7.13413C130.629 3.20063 135.711 1 141 1C146.289 1 151.371 3.20063 155.126 7.13413Z" stroke="black" stroke-width="2"/>
					</g>
					<defs>
						<clipPath id="clip0_5_34">
							<rect width="200" height="22" fill="white"/>
						</clipPath>
					</defs>
				</svg>

				<svg className="resistor" width="200" height="42" viewBox="0 0 200 42" fill="none">
					<g clip-path="url(#clip0_5_35)">
						<line y1="21" x2="40" y2="21" stroke="black" stroke-width="2"/>
						<line x1="42" y1="1" x2="162" y2="1" stroke="black" stroke-width="2"/>
						<line x1="40" y1="41" x2="160" y2="41" stroke="black" stroke-width="2"/>
						<line x1="41" y1="42" x2="41" stroke="black" stroke-width="2"/>
						<line x1="161" y1="42" x2="161" stroke="black" stroke-width="2"/>
						<line x1="162" y1="21" x2="200" y2="21" stroke="black" stroke-width="2"/>
					</g>
					<defs>
						<clipPath id="clip0_5_35">
							<rect width="200" height="42" fill="white"/>
						</clipPath>
					</defs>
				</svg>
            </div>
            </div>
        );
    }
}