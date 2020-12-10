import Camera from "../icons/Camera";

const { default: User } = require("../icons/User");

const Avatar = ({ url, onChange }) => {
    
    return (
        <div className='__avatar'>
            <div>{url ? <img src={url} alt='' className='__user' /> : <User className='__user' />}</div>
            {onChange && <Camera className='__camera' />}
        </div>
    )
}

export default Avatar;