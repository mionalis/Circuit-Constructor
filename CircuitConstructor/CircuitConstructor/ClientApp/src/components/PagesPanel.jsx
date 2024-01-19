import React from 'react';
import "./styles/mainContentStyles.css";

/**
 * Панель управления страницами. Позволяет переключаться между страницами, а также создавать новые.
 */
const PagesPanel = () => {
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

export default PagesPanel;