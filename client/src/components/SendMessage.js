const sendMessage = ({ onMessageSend }) => {
    const onSubmit = e => {
        e.preventDefault();
        const message = e.target.message.value.trim();
        e.target.message.value = '';
        message.length > 0 && onMessageSend(message);
    }
    return (
        <form className='__flex __send-message-wrapper' autoComplete='off' onSubmit={onSubmit}>
            <input className='__input __f1' name='message' placeholder='Type a message' />
            <button className='__btn'>Send</button>
        </form>
    )
}

export default sendMessage;