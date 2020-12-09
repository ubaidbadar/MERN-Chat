import Input from "../../ui/Input";
import checkValidity from "../../utility/checkValidity";

const LoginPage = props => {
    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = e.target;
        let isValid = checkValidity(email);
        isValid = checkValidity(password) && isValid;
        if (!isValid) return;
    }
    return (
        <div className='__LoginPage __flex-stretch'>
            <div className='__left __column __align-center __flex-center'>
                <h1 className='__title'>MERN App</h1>
            </div>
            <form className='__right' onSubmit={onSubmit} autoComplete='Off'>
                <h2 className='__title'>Welcome Back</h2>
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
        </div>
    )
}

export default LoginPage;