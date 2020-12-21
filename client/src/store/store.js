import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/auth';
import chatUsers from './reducers/chatUsers';
import chat from './reducers/chat';

const allReducers = combineReducers({ user, chatUsers, chat });

export default createStore(allReducers, applyMiddleware(thunk))