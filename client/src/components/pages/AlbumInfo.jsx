import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../features/reviews/reviewSlice';
import { formatDate } from '../../utils/formatDate';

const Album = () => {
  const location = useLocation();
  const { review, album } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const ratingString = () => {
    return `I give it a rating of ${review.rating}/5`;
  }

  const handleDelete = () => {
    dispatch(deleteReview(review._id, user.token))
    navigate('/albums');
  }

  return (
    <div className='album-wrapper'>
      <div className='album-div'>
        <img src={ album.albumCover } alt={ `Album art for ${album.artist}'s "${album.title}" album` } />
        <h2>{ album.title }</h2>
        <h3>{ album.artist }</h3>
        <p>{ formatDate(album.releaseDate) }</p>
      </div>
      <hr />
      <div className='review-div'>
        <h3>On <span>{ formatDate(review.createdAt.substring(0, 10)) }</span> you said: </h3>
        <p>
          <q>{ review.review }</q>. I { review.like ? <span>liked</span> : <><span>did not</span> like</> } this album. { review.rating && ratingString() }
        </p>
        <button><Link className='edit-btn btn' to={ `/reviews/${review._id}/edit` } state={{ data: review, redirect: '/albums'  }}>
          Edit
        </Link></button>
        <button className='delete-btn btn' onClick={ handleDelete }>Delete</button>
      </div>
    </div>
  )
}

export default Album;