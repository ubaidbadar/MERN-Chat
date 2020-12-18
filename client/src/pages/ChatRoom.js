import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";

const ChatRoom = props => {
    const { selectedUserId } = useParams();
    return (
        <div className='__flex'>
            <UserPanel />
            {selectedUserId ? <Chat selectedUserId={selectedUserId} /> : (
                <SelectChat />
            )}
        </div>
    )
}

export default ChatRoom;