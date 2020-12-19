import Avatar from '../ui/Avatar';

const ChatHeader = user => {
    return (
        <div className='__chatheader __flex'>
            <Avatar className='__selectedUserAvatar' /> {user.displayName}
        </div>
    )
}

export default ChatHeader;