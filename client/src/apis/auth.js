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