import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Input from "../ui/Input";
import checkValidity from "../utility/checkValidity";
import { useDispatch } from 'react-redux';
import { signUpAction } from "../store/actions/auth";

const SignUpPage = props => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");

    const onError = error => setStatus(error.message);

    const onSubmit = e => {
        e.preventDefault();
        const { email, password, displayName } = e.target;
        let isValid = checkValidity(email);
        isValid = checkValidity(password) && isValid;
        isValid = checkValidity(displayName) && isValid;
        if (!isValid) return;
        setStatus("loading");
        dispatch(signUpAction(email.value, password.value, displayName.value, onError));
    }
    return (
        <div className='__LoginPage'>
            <h1 className='__title'>MERN App</h1>
            <h2 className='__subtitle'>Create an account</h2>
            <form className='__right' onSubmit={onSubmit} autoComplete='Off'>
                <Input type='text'
                    name='displayName'
                    minLength={3}
                    placeholder='Display Name'
                    error='Must have 3 or characters'
                />
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
                        <button className='__btn __full'>Register Now</button>
                    </Fragment>
                )}
                <Link to='/sign-in' className='__link'>Already have an account</Link>
            </form>
        </div>
    )
}

export default SignUpPage;