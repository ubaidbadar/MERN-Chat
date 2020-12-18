import { useContext } from 'react';
import { sendMessage } from '../apis/chat';
import AuthContext from '../context/auth';

const Chat = ({selectedUserId}) => {
    const token = useContext(AuthContext).token;
    const onMessageSend = e => {
        e.preventDefault();
        const message = e.target.message.value.trim();
        message.length > 0 && sendMessage(token, message, selectedUserId);
    }
    return (
        <div className='__chat __f1 __column'>
            <div className='__f1'></div>
            <form className='__flex __send-message-wrapper' autoComplete='off' onSubmit={onMessageSend}>
                <input className='__input __f1' name='message' placeholder='Type a message' />
                <button className='__btn'>Send</button>
            </form>
        </div>
    )
}

export default Chat;