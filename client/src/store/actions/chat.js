import backendURL from '../backendURL';
import axios from "axios";
import { SAVE_CONVERSATION, SAVE_MESSAGE } from '../actionTypes';
import io from '../SocketIO';

const storeChatToRedux = (type, payload) => ({ type, payload });

export const sendMessageAction = (token, message, receiverUserId, onError) => dispatch => {
    axios.post(`${backendURL}/chat/${receiverUserId}`, { message }, { headers: { 'Authorization': 'Berear ' + token } })
        .then(({ data }) => dispatch(storeChatToRedux(SAVE_MESSAGE, data)))
        .catch(err => onError(err.response.data))
}

export const getSpecicUserChatAction = (token, selectedUserId, onError) => dispatch => {
    axios.get(`${backendURL}/chat/${selectedUserId}`, { headers: { Authorization: 'Bearer ' + token } })
        .then(({ data }) => {
            dispatch(storeChatToRedux(SAVE_CONVERSATION, data));
            io.on('chat', chat => dispatch(storeChatToRedux(SAVE_MESSAGE, chat)));
        })
        .catch(err => onError(err.response.data))
}