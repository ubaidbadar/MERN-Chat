import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";
import { useEffect, useState, useContext, memo, Fragment } from 'react';
import { getUserChats } from "../apis/chat";
import AuthContext from '../context/auth';

const ChatRoom = props => {
    const { selectedUserId } = useParams();
    const { user } = useContext(AuthContext);
    const [chatUsers, setChatUsers] = useState('initial');
    const [err, setError] = useState(null);
    useEffect(() => {
        getUserChats(user.token, setChatUsers, setError);
    }, [])
    return (
        <div className='__flex __ChatRoom'>
            {err ? <h1 className='__error'>{err.message}</h1> : (
                chatUsers === 'initial' ? <div className='__spinner __chatRoomSpinner'></div> : (
                    <Fragment>
                        <UserPanel users={chatUsers} />
                        {selectedUserId ? <Chat selectedUserId={selectedUserId} token={user.token} /> : <SelectChat />}
                    </Fragment>
                )
            )}
        </div>
    )
}

export default memo(ChatRoom);