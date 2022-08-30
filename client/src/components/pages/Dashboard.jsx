import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Review from './Review';
import { getReviews, reset } from '../../features/reviews/reviewSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { reviews, isLoading, isError, message } = useSelector(state => state.reviews);

  useEffect(() => {
    if(isError)
      console.log(message);

    if(!user) {
      navigate('/login');
    }

    dispatch(getReviews());

    return () => dispatch(reset());
  }, [user, navigate, isError, message, dispatch]);
  
  return (
    <div className='dashboard-div'>
      <div className='heading'>
        <h1>Welcome, { user && user.username } </h1>
        <p>Dashboard</p>
      </div>

      <div className='reviews-container'>
        {
          reviews.length > 0 ? (
              <div className='reviews'>
                {
                  reviews.map(review => <Review key={ review._id } reviewData={ review } />)
                }
              </div>
          )
          :
          <h3>No reviews yet.</h3>
        }
      </div>
    </div>
  )
}

export default Dashboard;