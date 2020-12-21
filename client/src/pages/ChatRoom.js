import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";
import { useEffect, useState, Fragment } from 'react';
// import { getUserChats } from "../apis/chat";
import { useSelector } from 'react-redux';

const ChatRoom = props => {
    const { selectedUserId } = useParams();
    const user = useSelector(({ user }) => user);
    const [chatUsers, setChatUsers] = useState('initial');
    const [err, setError] = useState(null);
    useEffect(() => {
        // getUserChats(user.token, setChatUsers, setError);
    }, []);
    return (
        <div className='__flex __ChatRoom'>
            {err ? <h1 className='__error'>{err.message}</h1> : (
                chatUsers === 'initial' ? <div className='__spinner __m-a'></div> : (
                    <Fragment>
                        <UserPanel users={chatUsers} />
                        {selectedUserId ? <Chat selectedUserId={selectedUserId} token={user.token} userId={user.userId} /> : <SelectChat />}
                    </Fragment>
                )
            )}
        </div>
    )
}

export default ChatRoom;