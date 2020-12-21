import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/auth';
import chatUsers from './reducers/chatUsers';

const allReducers = combineReducers({ user, chatUsers });

export default createStore(allReducers, applyMiddleware(thunk))