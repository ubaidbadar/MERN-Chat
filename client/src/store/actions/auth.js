import { USER_STATE } from "../actionTypes";
import backendURL from '../backendURL';
import axios from "axios";
import io from '../SocketIO';

const storeUserToRedux = payload => ({ type: USER_STATE, payload });

const asycLogoutHandler = (user, dispatch) => {
    const time = user.expiresIn - new Date().getTime();
    return setTimeout(() => logoutHandler(dispatch), time);
}
const logoutHandler = dispatch => {
    io.emit('logout');
    localStorage.clear('user');
    clearInterval(asycLogoutHandler);
    dispatch(storeUserToRedux(null));
}

const signInHandler = (user, dispatch) => {
    io.emit('join', user.userId);
    asycLogoutHandler(user, dispatch);
    dispatch(storeUserToRedux(user))
}

const onSignIn = (user, dispatch) => {
    localStorage.setItem('user', JSON.stringify(user));
    signInHandler(user, dispatch);
}

export const intialUserAction = () => dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) return signInHandler(user, dispatch);
    dispatch(storeUserToRedux(user));
}

export const signInAction = (email, password, onError) => dispatch => {
    axios.post(`${backendURL}/sign-in`, { email, password })
        .then(({ data }) => onSignIn(data, dispatch))
        .catch(err => onError(err.response.data));
}

export const signUpAction = (email, password, displayName, onError) => dispatch => {
    axios.post(`${backendURL}/sign-up`, { email, password, displayName })
        .then(({ data }) => onSignIn(data, dispatch))
        .catch(err => onError(err.response.data));
}

export const logoutAction = () => logoutHandler;