import option from '../utility/option';
import apiURL from './apiURL';

export const getChat = (token, userId) => {
    fetch(`${apiURL}/chat/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const sendMessage = (token, message, selectedUserId) => {
    const data = option(message, 'POST', token);
    fetch(`${apiURL}/chat/${selectedUserId}`, data)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
}