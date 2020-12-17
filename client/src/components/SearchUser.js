import Search from '../icons/Search';
import User from './User';

const SearchUser = props => {
    return (
        <div className='__SearchUser'>
            <div className='__input-field'>
                <input type='text' placeholder='Search User' className='__input __full' />
                <Search />
            </div>
            <div className='__users'>
                <User displayName='Ubaid Badar' searchResult={true} />
            </div>
        </div>
    )
}

export default SearchUser;