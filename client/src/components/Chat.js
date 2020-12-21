import { useState, useEffect } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import SendMessage from './SendMessage';
import { getSpecicUserChatAction, sendMessageAction } from '../store/actions/chat';

const Chat = ({ selectedUserId, token, userId, dispatch, chat }) => {
    const [err, setError] = useState(null);

    useEffect(() => {
        dispatch(getSpecicUserChatAction(token, selectedUserId, setError));
    }, [selectedUserId, token]);

    const onMessageSend = message => {
        dispatch(sendMessageAction(token, message, selectedUserId, setError))
    }

    return err ? <div className='__error __m-a'> {err.message} </div> : (
        chat ? (
            chat === 'initial' ? <div className='__spinner __m-a'></div> : (
                <div className='__chat __f1 __column'>
                    <ChatHeader {...chat.user} />
                    <div className='__conversation'>
                        {chat.messages.map(message => message && <Message {...message} key={message._id} isSenderIsUser={message.sender === userId} />)}
                    </div>
                    <SendMessage onMessageSend={onMessageSend} />
                </div>
            )
        ) : null
    )
}

export default Chat;