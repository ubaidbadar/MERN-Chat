import apiURL from './apiURL';
import option from "../utility/option";

export const signin = (email, password, onSignIn, onError) => {
    const auth = option({ email, password });
    return fetch(`${apiURL}/sign-in`, auth)
        .then(async res => {
            const data = await res.json();
            res.status === 200 ? onSignIn(data) : onError(data);
        })
        .catch(onError);
}

export const signup = (email, password, displayName, onSignIn, onError) => {
    const auth = option({ email, password, displayName });
    return fetch(`${apiURL}/sign-up`, auth)
        .then(async res => {
            const data = await res.json();
            res.status === 201 ? onSignIn(data) : onError(data);
            console.log(data);
        })
        .catch(onError);
}