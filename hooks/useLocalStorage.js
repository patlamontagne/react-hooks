import { useEffect, useState } from 'react';

export default (key, defaultValue = null) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const initialValue = JSON.parse(localStorage.getItem(key));
        if (initialValue) {
            setValue(initialValue);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};
