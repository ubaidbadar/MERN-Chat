import Chat from "../components/Chat";
import UserPanel from "../components/UserPanel";
import { useParams } from 'react-router-dom';
import SelectChat from "../components/SelectChat";
import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chatUsersAction } from "../store/actions/chatUsersAction";

const ChatRoom = () => {
    const { selectedUserId } = useParams();
    const { user, chatUsers, chat } = useSelector(store => store);
    const dispatch = useDispatch();
    const [err, setError] = useState(null);
    useEffect(() => {
        dispatch(chatUsersAction(user.token, setError));
    }, [dispatch]);
    return (
        <div className='__flex __ChatRoom'>
            {err ? <h1 className='__error'>{err.message}</h1> : (
                chatUsers === 'initial' ? <div className='__spinner __m-a'></div> : (
                    <Fragment>
                        <UserPanel users={chatUsers} token={user.token} />
                        {selectedUserId ? <Chat selectedUserId={selectedUserId} token={user.token} userId={user.userId} chat={chat} dispatch={dispatch} /> : <SelectChat selectedUserId={selectedUserId} />}
                    </Fragment>
                )
            )}
        </div>
    )
}

export default ChatRoom;