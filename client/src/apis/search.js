import apiURL from './apiURL';

export const search = (token, searchString, onSearched, onError) => {
    fetch(`${apiURL}/search/${searchString}`, {
        headers: {
            Authorization: 'Berears ' + token
        }
    })
        .then(async res => {
            const data = await res.json();
            if(res.status === 200) return onSearched(data);
            onError(data);
        })
        .catch(onError);
}