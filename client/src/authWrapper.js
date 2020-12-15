import { useState, useEffect } from 'react';

const authWrapper = WrappedComponent => {

    const App = props => {
        const [user, setUser] = useState(null);
        let timer = interval => setTimeout(() => {
            setUser(null);
        }, interval);

        const addLogoutTimmer = () => {
            const time = new Date().getTime();
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                timer(user.expiresIn - time);
                setUser(user);
            }
        }

        const onLogin = user => {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            timer(user.expiresIn);
        }

        const onLogout = () => {
            clearInterval(timer);
            setUser(null);
        }

        useEffect(() => {
            addLogoutTimmer();
            return () => {
                clearInterval(timer);
            }
        }, []);

        return <WrappedComponent user={user} onLogin={onLogin} onLogout={onLogout} {...props} />;
    }

    return App;
}


export default authWrapper;