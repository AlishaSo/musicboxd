import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { reviewsContext } from '../../utils/reviewContext';
import { albumsDataContext } from '../../utils/albumsContext';
import Spinner from '../shared/Spinner';

const Albums = () => {
  const { albums } = useContext(albumsDataContext);
  const { allReviews } = useContext(reviewsContext);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

  const getLink = albumId => {
    if(allReviews.length > 0) {
      for(const review of allReviews) {
        if(review.album._id == albumId) {
          return [`/reviews/${review._id}`, review];
        }
      }
    }
    return user ? `/albums/${albumId}/add` : `/albums/${albumId}`;
  }

  const displayAlbums = () => {
    return albums.map(album => {
      const info = getLink(album._id);
      return (
        <Link key={ album._id } to={ Array.isArray(info) ? info[0] : info } state={{ review: info[1], album }} >
          <img 
            key={ `img-${album._id}` } 
            className = 'album-art' 
            src = { `${album.albumCover}` } 
            alt = { `Album art for ${album.artist}'s "${album.title}" album` }
          />
        </Link>);
     })
  }

  return (
    <div className='albums-div'>
      { albums ? displayAlbums() : <Spinner /> }
    </div>
  )
}

export default Albums;