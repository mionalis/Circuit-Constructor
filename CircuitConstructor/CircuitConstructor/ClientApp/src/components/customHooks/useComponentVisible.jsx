import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const componentRef = useRef(null);

    const handleClickOutside = (event) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

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