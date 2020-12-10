const { default: Avatar } = require("../ui/Avatar");

const UploadPicturePage = props => {
    const onChange = e => {

    }
    return (
        <div className='__upload-profile-picture'>
            <h1 className='__title'>MERN App</h1>
            <Avatar onChange={onChange} />
        </div>
    )
}

export default UploadPicturePage;