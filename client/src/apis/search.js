import axios from 'axios';

export const search = (token, searchString, onSearched, onError) => {
    axios.get(`http://localhost:5000/search/${searchString}`, {
        headers: {
            Authorization: 'Berears ' + token
        }
    })
        .then(({ data }) => onSearched(data))
        .catch(err => onError(err.response.data));
}