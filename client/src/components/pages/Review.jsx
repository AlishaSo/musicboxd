import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../features/reviews/reviewSlice';
import { Link, useNavigate } from 'react-router-dom';

const Review = props => {
  const { 
    _id,
    album,
    review
  } = props.reviewData;
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteReview(_id, user.token))
    navigate('/dashboard');
    navigate(0);
  }

  return (
      <div className='review-comp-div'>
        <img src={ album.albumCover } alt={`Album art for ${album.artist}'s "${album.title}" album`} />
        <h2>{ album.title }</h2>
        <p>{ review }</p>
        <button><Link className='edit-btn btn' to={ `/reviews/${_id}/edit` } state={{ data: props.reviewData, redirect: '/dashboard'  }}>
          Edit
        </Link></button>
        <button className='delete-btn btn' onClick={ handleDelete }>Delete</button>
      </div>
  )
}

export default Review;