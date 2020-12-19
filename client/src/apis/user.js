import apiURL from './apiURL';

export const getUser = (userId, token, onSuccess, onError) => {
    fetch(`${apiURL}/user/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then(async res => {
            const data = await res.json();
            if(res.status === 200) return onSuccess(data);
            onError(data);
        })
        .catch(onError)
}