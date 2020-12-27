import React, { Fragment } from 'react';
import Avatar from '../ui/Avatar';
import { Link } from 'react-router-dom';
import toDate from '../utility/toDate';

const User = ({ displayName, date, message, _id, className, unReadeMessagesLength, searchResult = false }) => {
    return (
        <Link to={`/chat/${_id}`} className={`__User ${className} ${searchResult ? '__searchResult' : ''}`} replace>
            <Avatar className='__user-image' />
            <div className='__displayName'>{displayName}</div>
            {!searchResult && (
                <Fragment>
                    <div className='__date'>{toDate(date)}</div>
                    <div className='__last-message'>{message} ab asjhkajs ahks ahsjakhs hajshka shjashk ashjkahs hkh</div>
                    <div className='__unreade-messages-length'>{unReadeMessagesLength}</div>
                </Fragment>
            )}
        </Link>
    )
}

export default User;