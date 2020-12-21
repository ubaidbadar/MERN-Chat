import backendURL from '../backendURL';
import axios from "axios";
import { CHAT_USERS } from '../actionTypes';

const storeToRedux = payload => ({ type: CHAT_USERS, payload });

export const chatUsersAction = (token, onError) => dispatch => {
    axios.get(`${backendURL}/chats`, { headers: { 'Authorization': 'Berear ' + token } })
        .then(({ data }) => dispatch(storeToRedux(data)))
        .catch(err => onError(err.response.data))
}