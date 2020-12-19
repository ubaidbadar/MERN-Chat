import actionType from './ChatActionTypes'

const chatReducer = (state = 'initial', action) => {
    switch (action.type) {
        case actionType.SAVE_CONVERSATION:
            return action.payload;
        case actionType.SAVE_MESSAGE:
            const newMessages = [...state.messages, action.payload];
            return {...state.user, messages: newMessages};
        default:
            return state;
    }
}

export default chatReducer;