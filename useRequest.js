import { useCallback, useState } from 'react';
import axios from 'axios';

export default (defaultData = {}) => {
    const [errors, setErrors] = useState([]);
    const request = useCallback((method, url, data = {}, headers = {}) => {
        setErrors([]);

        return axios
            .request({
                url,
                method,
                data: {
                    ...defaultData,
                    ...data,
                },
                headers,
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                if (error.response.status !== 200 && error.response.data.errors) {
                    let errors = [];

                    switch(typeof error.response.data.errors) {
                        case 'object':
                            errors = error.response.data.errors;
                            break;
                        case 'string':
                            errors = [error.response.data.errors];
                            break;
                        default :
                    }

                    setErrors(errors);
                } else if (error.response.status !== 200) {
                    setErrors(["Une erreur s'est produite. Veuillez réessayer plus tard."]);
                }

                // document.body.scrollTop = 0;
                // document.documentElement.scrollTop = 0;
                return errors;
            });
    }, []);

    return { request, errors };
};
