import { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { signin } from "../apis/auth";
import Input from "../ui/Input";
import checkValidity from "../utility/checkValidity";
import AuthContext from '../context/auth';

const LoginPage = props => {
    const { onLogin } = useContext(AuthContext);
    const [status, setStatus] = useState("");

    const onError = error => {
        console.log(error)
        setStatus(error.message)
    };

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = e.target;
        let isValid = checkValidity(email);
        isValid = checkValidity(password) && isValid;
        if (!isValid) return;
        setStatus("loading");
        signin(email.value, password.value, onLogin, onError)
    }
    return (
        <div className='__LoginPage'>
            <h1 className='__title'>MERN App</h1>
            <h2 className='__subtitle'>Welcome Back</h2>
            <form onSubmit={onSubmit} autoComplete='Off'>
                <Input type='text'
                    name='email'
                    placeholder='Email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    error="Email is not valid, e.g., test@example.com"
                />
                <Input type='password'
                    name='password'
                    placeholder='Password'
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                    error="Must have at least a number, a uppercase and lowercase letter, and 6 or more characters"
                />
                {status === 'loading' ? <div className='__loader-container'> <div className='__spinner'></div> </div> : (
                    <Fragment>
                        <div className='__error __error-message'>{status}</div>
                        <button className='__btn __full'>Sign In</button>
                    </Fragment>
                )}

            </form>
            <Link to='/sign-up' className='__link'>Create an account</Link>
        </div>
    )
}

export default LoginPage;