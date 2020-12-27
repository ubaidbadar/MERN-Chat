import axios from 'axios';
import { SEARCH_USER } from '../actionTypes';

export const storeToRedux = payload => ({ type: SEARCH_USER, payload })

export const searchAction = (searchString = '', token, onError = () => {}) => dispatch => {
    searchString.trim().length < 1 || !searchString ?
        dispatch(storeToRedux([])) :
        axios.get(`http://localhost:5000/search/${searchString}`, { headers: { Authorization: 'Berears ' + token } })
            .then(({ data }) => dispatch(storeToRedux(data)))
            .catch(err => onError(err.response.data));
}