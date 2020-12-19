import { useState, useEffect } from 'react';
import { getChat, sendMessage } from '../apis/chat';
import Message from './Message';
import Avatar from '../ui/Avatar';

const Chat = ({ selectedUserId, token, userId }) => {
    const [chat, setChat] = useState('initial');
    const [err, setError] = useState(null);
    const onMessageSend = e => {
        e.preventDefault();
        const message = e.target.message.value.trim();
        message.length > 0 && sendMessage(token, message, selectedUserId);
    }
    useEffect(() => {
        getChat(token, selectedUserId, setChat, setError)
    }, [selectedUserId])
    return err ? <div className='__error __m-a'> {err.message} </div> : (
        chat === 'initial' ? <div className='__spinner __m-a'></div> : (
            <div className='__chat __f1 __column'>
                <div className='__chatheader __flex'>
                    <Avatar className='__selectedUserAvatar' /> {chat.user.displayName}
                </div>
                <div className='__conversation'>
                    {chat.messages.map(message => <Message {...message} key={message._id} isSenderIsUser={message.sender === userId} />)}
                </div>
                <form className='__flex __send-message-wrapper' autoComplete='off' onSubmit={onMessageSend}>
                    <input className='__input __f1' name='message' placeholder='Type a message' />
                    <button className='__btn'>Send</button>
                </form>
            </div>
        )
    )
}

export default Chat;