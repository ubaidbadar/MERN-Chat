import React from 'react';
import User from '../components/User';
import SearchUser from './SearchUser';

const UserPanel = ({ users }) => {
    return (
        <div className='__UserPanel'>
            <SearchUser />
            {users.map(user => <User {...user} key={user._id} />)}
        </div>
    )
}

export default UserPanel;