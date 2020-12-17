import React, { Fragment } from 'react';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';

const User = ({ displayName, date, lastMessage, _id, searchResult = false }) => (
    <Link to={`/chat/${_id}`} className={`__User ${searchResult ? '__searchResult' : ''}`} replace>
        <Avatar className='__user-image' />
        <div className='__displayName'>{displayName}</div>
        {date && (
            <Fragment>
                <div className='__date'>{date}</div>
                <div className='__last-message'>{lastMessage}</div>
            </Fragment>
        )}
    </Link>
)

export default User;