import React, { Fragment, useState, useEffect, useContext } from 'react';
import openSocket from 'socket.io-client';
import { useParams } from 'react-router-dom';
import User from './User';
import AuthContext from '../context/auth';
import { getChat, sendMessage } from '../apis/chat';

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userId } = useParams();
    const [err, setError] = useState(null);
    const [messages, setMessages] = useState(null);
    const onMessageSubmit = e => {
        e.preventDefault();
        sendMessage(user.token, userId, { message: e.target.message.value });
    }
    useEffect(() => {
        getChat(user.token, userId);
    }, [])
    return (
        <div className='__chat __f1 __column'>
            {/* {messages ? ( */}
            <Fragment>
                <div className='__f1'></div>
                <form className='__flex __send-message-wrapper' onSubmit={onMessageSubmit} autoComplete='off'>
                    <input className='__input __f1' name='message' placeholder='Type a message' />
                    <button className='__btn'>Send</button>
                </form>
            </Fragment>
            {/* ) : <div className='__spinner'></div>} */}
        </div>
    )
}

export default Chat;