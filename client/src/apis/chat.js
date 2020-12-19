import option from '../utility/option';
import apiURL from './apiURL';

export const getChat = (token, selectedUserId, onSuccess, onError) => {
    fetch(`${apiURL}/chat/${selectedUserId}`, { headers: { Authorization: 'Bearer ' + token } })
        .then(async res => {
            const data = await res.json();
            if(res.status === 200) return onSuccess(data);
            onError(data)
        })
        .catch(err => console.log(err))
}

export const sendMessage = (token, message, selectedUserId) => {
    const data = option({ message }, 'POST', token);
    fetch(`${apiURL}/chat/${selectedUserId}`, data)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const getUserChats = (token, onSuccess, onError) => {
    fetch(`${apiURL}/chats`, { headers: { Authorization: 'Berear ' + token } })
        .then(async res => {
            const data = await res.json();
            if(res.status === 200) return onSuccess(data);
            onError(data)
        })
        .catch(onError)
}