import { useState, useEffect, useRef } from 'react';

/**
 * Скрывает компонент, когда пользователь кликает за пределами элемента, и показывает компонент,
 * когда пользователь нажимает на элемент.
 * @param initialIsVisible - Булевое значение. Если True - показывает элемент, False - скрывает.
 * @returns {{componentRef: React.MutableRefObject<null>, isComponentVisible: *, setIsComponentVisible: (value: (((prevState: *) => *) | *)) => void}}
 */
export default function useComponentVisible(initialIsVisible) {
    /**
     * Хранит и устанавливает булевое значение, которое определяет видимость элемента.
     */
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);

    /**
     * Ссылка на скрываемый элемент.
     * @type {React.MutableRefObject<null>}
     */
    const componentRef = useRef(null);

    /**
     * Считывает клик за пределами элемента.
     * @param event
     */
    const handleClickOutside = (event) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    /**
     * Вызывает метод handleClickOutside в зависимости от совершенного события.
     */
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('dragstart', handleClickOutside, true);
        document.addEventListener('mousedown', handleClickOutside, true);
        
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('dragstart', handleClickOutside, true);
            document.addEventListener('mousedown', handleClickOutside, true);
        };
    }, []);

    return { componentRef, isComponentVisible, setIsComponentVisible };
}