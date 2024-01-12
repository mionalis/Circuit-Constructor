import React, { Component } from 'react';
import "./styles/mainContentStyles.css";

/**
 * Панель управления страницами. Позволяет переключаться между страницами, а также создавать новые.
 */
export class PagesPanel extends Component {
    static displayName = PagesPanel.name;
    render() {
        return (
            <div className="pages-panel">
                <select multiple className="pages-select" size="1">
                    <option className="page-option">Page 1</option>
                    <option className="page-option">Page 2</option>
                </select>
                <button className="add-page-button">+</button>
            </div>
        );
    }
}