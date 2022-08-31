import { useLocation, Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import Spinner from '../shared/Spinner';

const Album = () => {
  const location = useLocation();
  const { album } = location.state;

  return (
    <div className='album-comp-wrapper'>
      {
        album ?
        (<>
          <div className='album-info'>
            <img src={ album.albumCover } alt={ `Album art for ${album.artist}'s "${album.title}" album` } />
            <h2>{ album.title }</h2>
            <h3>{ album.artist }</h3>
            <p className='date'>{ formatDate(album.releaseDate) }</p>
          </div>
          <p><Link className='user-log-link' to='/login'>Login</Link> or <Link className='user-sign-link' to='/sign-up'>Sign Up</Link> to add a review!</p>
        </>)
        :
        <Spinner />
      }
    </div>
  )
}

export default Album;