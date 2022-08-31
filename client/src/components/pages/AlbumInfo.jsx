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
          <q>{ review.review }</q>. I { review.like ? <span>liked</span> : <><span>did not</span> like</> } this album. { review.rating && `I give it a rating of <span>${ review.rating }/5</span>` }
        </p>
        <Link to={ `/reviews/${review._id}/edit` } state={{ data: review, redirect: '/albums'  }}>
          <button>Edit</button>
        </Link>
        <button onClick={ handleDelete }>Delete</button>
      </div>
    </div>
  )
}

export default Album;