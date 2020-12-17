import apiURL from './apiURL';

export const search = (searchString, onSearched, onError) => {
    fetch(`${apiURL}/search/${searchString}`)
        .then(async res => {
            const data = await res.json();
            if(res.status === 200) return onSearched(data);
            onError(data);
        })
        .catch(onError);
}