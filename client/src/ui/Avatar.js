import Camera from "../icons/Camera";

const { default: User } = require("../icons/User");

const Avatar = ({ url, onChange, className="" }) => {
    
    return (
        <div className={`__avatar ${className}`}>
            <div>{url ? <img src={url} alt='' /> : <User className='__user-dummy-image' />}</div>
            {onChange && <Camera className='__camera' />}
        </div>
    )
}

export default Avatar;