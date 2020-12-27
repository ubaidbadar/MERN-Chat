import React from 'react';
import User from '../components/User';
import SearchUser from './SearchUser';

const UserPanel = ({ users, token }) => {
    return (
        <div className='__UserPanel'>
            <SearchUser token={token} />
            {users.map(user => <User {...user} key={user._id} />)}
        </div>
    )
}

export default UserPanel;