import { useState, useEffect, Fragment, useRef } from 'react';
import Message from './Message';
import ChatHeader from './ChatHeader';
import SendMessage from './SendMessage';
import { getSpecicUserChatAction, sendMessageAction } from '../store/actions/chat';

const Chat = ({ selectedUserId, token, userId, dispatch, chat }) => {
    const [err, setError] = useState(null);
    const unReadRef = useRef();
    let unRead = false;
    useEffect(() => {
        dispatch(getSpecicUserChatAction(token, selectedUserId, setError));
    }, [selectedUserId, token]);
    unReadRef && ( unReadRef.current && unReadRef.current.scroll())

    const onMessageSend = message => {
        dispatch(sendMessageAction(token, message, selectedUserId, setError))
    }

    return err ? <div className='__error __m-a'> {err.message} </div> : (
        chat ? (
            chat === 'initial' ? <div className='__spinner __m-a'></div> : (
                <div className='__chat __f1 __column'>
                    <ChatHeader {...chat.user} />
                    <div className='__conversation'>
                        {chat.messages.map(message => {
                            let showUnReadMessage = false;
                            const isSenderIsUser = message.sender === userId;
                            if(!unRead && !isSenderIsUser){
                                unRead = true;
                                showUnReadMessage = true;
                            }
                            return (
                                <Fragment key={message._id}>
                                    {showUnReadMessage && <div className='__unRead-label' ref={unReadRef}>Unread Messages</div>}
                                    <Message {...message} isSenderIsUser={isSenderIsUser} />
                                </Fragment>
                            )
                        })}
                    </div>
                    <SendMessage onMessageSend={onMessageSend} />
                </div>
            )
        ) : null
    )
}

export default Chat;