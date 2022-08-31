import { useLocation, Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const Album = () => {
  const location = useLocation();
  const { album } = location.state;

  return (
    <div className='album-comp-wrapper'>
      <div className='album-info'>
        <img src={ album.albumCover } alt={ `Album art for ${album.artist}'s "${album.title}" album` } />
        <h2>{ album.title }</h2>
        <h3>{ album.artist }</h3>
        <p>{ formatDate(album.releaseDate) }</p>
      </div>
      <p><Link to='/login'>Login</Link> or <Link to='/sign-up'>Sign Up</Link> to add a review!</p>
    </div>
  )
}

export default Album;