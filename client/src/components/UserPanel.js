import React from 'react';
import User from '../components/User';

const UserPanel = props => {
    return (
        <div className='__UserPanel'>
            <h1 className='__title'>MERN Chat</h1>
            <User displayName='Ubaid Badar S/O Muhammad Younis' _id='d1' lastMessage='last Message hjh sdhdjsdh hsjkdh shdjksh shdjshk dhjskdhj sdhjks dshjkdhs dhjskdh shdjksh hjkh' date='Aug 28, 2020' />
        </div>
    )
}

export default UserPanel;