import { useState, useEffect } from 'react';
import Search from '../icons/Search';
import User from './User';
import { searchAction } from '../store/actions/search';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SearchUser = ({ token }) => {
    const users = useSelector(({ search }) => search);
    const dispatch = useDispatch();
    const history = useHistory();

    const [showUsers, setShowUsers] = useState(false);
    const [activeUserIndex, setActiveUserIndex] = useState(-1);

    const initialStateHandler = () => {
        setShowUsers(false);
        setActiveUserIndex(-1);
        dispatch(searchAction());
    }

    useEffect(() => {
        initialStateHandler();
    }, [history.location.pathname]);

    const onChange = e => dispatch(searchAction(e.target.value, token));

    const onKeyDown = e => {
        const usrs = [...users]
        if (usrs.length > 0) {
            const keyCode = e.keyCode;
            if (keyCode === 13 && activeUserIndex > -1 && activeUserIndex < users.length) {
                e.target.value = '';
                return history.replace(`/chat/${users[activeUserIndex]._id}`);
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
                <input type='text' placeholder='Search User' className='__input __full' onChange={onChange} onKeyDown={onKeyDown} onBlur={() => setShowUsers(false)} onFocus={() => setShowUsers(true)} />
                <Search />
            </label>
            {showUsers && (
                <div className='__users'>
                    {users.length > 0 && users.map((user, index) => <User {...user} key={user._id} searchResult={true} className={activeUserIndex === index ? 'active' : ''} />)}
                </div>
            )}
        </div>
    )
}

export default SearchUser;