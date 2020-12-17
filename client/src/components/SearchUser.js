import { useState, useEffect } from 'react';
import Search from '../icons/Search';
import User from './User';
import { search } from '../apis/search';
import { useHistory } from 'react-router-dom';

const SearchUser = props => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [activeUserIndex, setActiveUserIndex] = useState(-1);
    const [error, setEror] = useState(null);

    const initialStateHandler = () => {
        setUsers([]);
        setEror(null);
        setActiveUserIndex(-1);
    }

    useEffect(() => {
        initialStateHandler();
    }, [history.location.pathname]);

    const onChange = e => {
        initialStateHandler();
        const value = e.target.value.trim();
        value.length > 0 && search(value, setUsers, setEror);
    };

    const onKeyDown = e => {
        const usrs = [...users]
        if (usrs.length > 0) {
            const keyCode = e.keyCode;
            if (keyCode === 13 && activeUserIndex > -1 && activeUserIndex < users.length) {
                e.target.value = '';
                return history.replace(`/${users[activeUserIndex]._id}`);
            }
            let nextActiveUserIndex = activeUserIndex;
            if (keyCode === 40) {
                if (activeUserIndex < 0 || activeUserIndex >= (users.length - 1)) {
                    nextActiveUserIndex = 0;
                }
                else nextActiveUserIndex++;
            }
            else if (keyCode === 38) {
                if (activeUserIndex < 1) nextActiveUserIndex = users.length - 1;
                else nextActiveUserIndex--;
            }
            setActiveUserIndex(nextActiveUserIndex);
        }
    }
    return (
        <div className='__SearchUser'>
            <label className='__input-field'>
                <input type='text' placeholder='Search User' className='__input __full' onChange={onChange} onKeyDown={onKeyDown} />
                <Search />
            </label>
            <div className='__users'>
                {users.length > 0 && users.map((user, index) => <User {...user} key={user._id} searchResult={true} className={activeUserIndex === index ? 'active' : ''} />)}
                {error && <div className='__error'>{error.message}</div>}
            </div>
        </div>
    )
}

export default SearchUser;