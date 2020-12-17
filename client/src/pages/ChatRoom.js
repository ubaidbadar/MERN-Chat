import Chat from "../components/Chat"
import UserPanel from "../components/UserPanel"

const ChatRoom = props => {
    return (
        <div className='__flex'>
            <UserPanel />
            <Chat />
        </div>
    )
}

export default ChatRoom;