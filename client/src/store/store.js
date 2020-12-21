import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/auth';
import thunk from 'redux-thunk';

const allReducers = combineReducers({ user });

export default createStore(allReducers, applyMiddleware(thunk))