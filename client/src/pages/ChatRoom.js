import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";

const ChatRoom = props => {
    const { userId } = useParams();
    console.log(userId);
    return (
        <div className='__flex'>
            <UserPanel />
            {userId ? <Chat /> : (
                <SelectChat />
            )}
        </div>
    )
}

export default ChatRoom;