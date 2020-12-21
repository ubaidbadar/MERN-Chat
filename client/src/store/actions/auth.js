import { USER_STATE } from "../actionTypes";
import backendURL from '../backendURL';
import axios from "axios";


const storeUserToRedux = payload => ({ type: USER_STATE, payload });
const asycLogoutHandler = (user, dispatch) => {
    const time = user.expiresIn - new Date().getTime();
    return setTimeout(() => logout(dispatch), time);
}
const logout = dispatch => {
    localStorage.clear('user');
    clearInterval(asycLogoutHandler);
    dispatch(storeUserToRedux(null));
}
const signInHandler = (user, dispatch) => {
    localStorage.setItem('user', JSON.stringify(user));
    asycLogoutHandler(user, dispatch);
    dispatch(storeUserToRedux(user))
}

export const intialUserAction = () => dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) asycLogoutHandler(user, dispatch);
    dispatch(storeUserToRedux(user));
}

export const signInAction = (email, password, onError) => dispatch => {
    axios.post(`${backendURL}/sign-in`, { email, password })
        .then(({ data }) => signInHandler(data, dispatch))
        .catch(err => onError(err.response.data));
}

export const logoutAction = () => dispatch => logout(dispatch);