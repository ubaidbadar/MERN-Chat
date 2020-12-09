import { Link } from "react-router-dom";
import Input from "../ui/Input";
import checkValidity from "../utility/checkValidity";

const LoginPage = props => {
    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = e.target;
        let isValid = checkValidity(email);
        isValid = checkValidity(password) && isValid;
        if (!isValid) return;
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
                <button className='__btn __full'>Sign In</button>
            </form>
            <Link to='/sign-up' className='__link'>Create an account</Link>
        </div>
    )
}

export default LoginPage;