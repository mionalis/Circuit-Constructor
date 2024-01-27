import React, {useState} from 'react';

/**
 * Реализует раскрывающийся список.
 * @returns {[toggleValue, toggler]}
 */
export default function useToggle() {
    /**
     * Хранит и устанавливает содержимое раскрывающегося списка.
     */
    const [toggleValue, setToggleValue] = useState();
    
    /**
     * Раскрывает или скрывает содержимое раскрывающегося списка.
     */
    const toggler = () => {setToggleValue(!toggleValue)};
    
    return [toggleValue, toggler];
};