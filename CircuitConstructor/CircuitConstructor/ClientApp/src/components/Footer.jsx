import React from 'react';
import "./styles/footerStyles.css";

/**
 * Нижняя панель приложения. Отображает номер текущей страницы и позволяет настраивать 
 * масштаб монтажной поверхности при помощи бегунка.
 */
const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">Page 2 of 2</p>
            <div className="scale-slider-box">
                <p className="footer-text">-</p>
                <input type="range" className="scale-slider"></input>
                <p className="footer-text">+</p>
                <p className="scale-value">100%</p>
            </div>
        </footer>
    );
}

export default Footer;