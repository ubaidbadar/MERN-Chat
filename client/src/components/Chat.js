import { useState, useEffect, useReducer } from 'react';
import { getChat, sendMessage } from '../apis/chat';
import Message from './Message';
import ChatHeader from './ChatHeader';
import SendMessage from './SendMessage';
import actionTypes from './ChatActionTypes';
import chatReducer from './ChatReducer';
import io from '../SocketIO';

const Chat = ({ selectedUserId, token, userId }) => {
    const [chat, dispatch] = useReducer(chatReducer);
    const [err, setError] = useState(null);
    const onSuccess = message => dispatch({ type: actionTypes.SAVE_MESSAGE, payload: message });

    useEffect(() => {
        getChat(
            token,
            selectedUserId,
            conversation => dispatch({ payload: conversation, type: actionTypes.SAVE_CONVERSATION }),
            setError,
        );
        io.on('chat', onSuccess);
    }, [selectedUserId, token]);

    return err ? <div className='__error __m-a'> {err.message} </div> : (
        chat ? (
            chat === 'initial' ? <div className='__spinner __m-a'></div> : (
                <div className='__chat __f1 __column'>
                    <ChatHeader {...chat.user} />
                    <div className='__conversation'>
                        {chat.messages.map(message => message && <Message {...message} key={message._id} isSenderIsUser={message.sender === userId} />)}
                    </div>
                    <SendMessage onMessageSend={message => sendMessage(token, message, selectedUserId, onSuccess)} />
                </div>
            )
        ) : null
    )
}

export default Chat;