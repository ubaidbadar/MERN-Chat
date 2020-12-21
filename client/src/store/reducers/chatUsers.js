import { CHAT_USERS } from "../actionTypes";

const chatUsers = (state = 'initial', { type, payload }) => {
    if (type === CHAT_USERS) return state === 'initial' ? payload : [...state, ...payload]
    return state
}

export default chatUsers;