import {useState, useEffect} from 'react';

export default function useFetchData(endpoint) {

    const [backendData, setBackendData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw Error('could not fetch data from response');
            } else {
                return response.json();
            }
        })
        .then(data => {
            setBackendData(data);
        })
        .catch(error => {
            setErrorMessage(error.message);
            console.log(error.message);
        })
    
    }, [endpoint]);

    return {backendData, errorMessage};
}