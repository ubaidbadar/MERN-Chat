import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";
import { useEffect, useState, useContext, memo } from 'react';
import { getUserChats } from "../apis/chat";
import AuthContext from '../context/auth';

const ChatRoom = props => {
    const { selectedUserId } = useParams();
    const { user } = useContext(AuthContext);
    const [chatUsers, setChatUsers] = useState('initial');
    useEffect(() => {
        getUserChats(user.token);
    }, [])
    console.log('updated')
    return (
        <div className='__flex'>
            <UserPanel />
            {selectedUserId ? <Chat selectedUserId={selectedUserId} token={user.token} /> : (
                <SelectChat />
            )}
        </div>
    )
}

export default memo(ChatRoom);