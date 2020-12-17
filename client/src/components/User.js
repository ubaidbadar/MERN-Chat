import React from 'react';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';

const User = ({ displayName, date, lastMessage, _id }) => (
    <Link to={`/chat/${_id}`} className='__User' replace>
        <Avatar className='__user-image' />
        <div className='__displayName'>{displayName}</div>
        <div className='__date'>{date}</div>
        <div className='__last-message'>{lastMessage}</div>
    </Link>
)

export default User;