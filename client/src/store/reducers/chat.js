import { SAVE_CONVERSATION, SAVE_MESSAGE } from '../actionTypes'

const chat = (state = 'initial', { type, payload }) => {
    switch (type) {
        case SAVE_CONVERSATION:
            return payload;
        case SAVE_MESSAGE:
            const newMessages = [...state.messages, payload];
            return { ...state.user, messages: newMessages };
        default:
            return state;
    }
}

export default chat;