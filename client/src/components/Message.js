import React from 'react';

const Message = ({message, isSenderIsUser}) => {
    return (
        <div className={`__Message ${isSenderIsUser ? '__right' : ''}`}>
            <div className='__message'>{message}</div>
        </div>
    )
}

export default Message;