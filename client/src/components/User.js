import React, { Fragment } from 'react';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';

const User = ({ displayName, date, message, _id, className, searchResult = false }) => (
    <Link to={`/chat/${_id}`} className={`__User ${className} ${searchResult ? '__searchResult' : ''}`} replace>
        <Avatar className='__user-image' />
        <div className='__displayName'>{displayName}</div>
        {!searchResult && (
            <Fragment>
                <div className='__date'>{date}</div>
                <div className='__last-message'>{message}</div>
            </Fragment>
        )}
    </Link>
)

export default User;