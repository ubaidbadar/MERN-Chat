import React from 'react';

const Chat = () => {
    return (
        <div className='__chat __f1 __column'>
            <div className='__f1'></div>
            <form className='__flex __send-message-wrapper' autoComplete='off'>
                <input className='__input __f1' name='message' placeholder='Type a message' />
                <button className='__btn'>Send</button>
            </form>
        </div>
    )
}

export default Chat;