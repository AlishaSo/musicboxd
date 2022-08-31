import { useSelector } from 'react-redux';
import Review from './Review';
import { useContext } from 'react';
import { reviewsContext } from '../../utils/reviewContext';

const Dashboard = () => {
  const { allReviews } = useContext(reviewsContext);
  const { user } = useSelector(state => state.auth);
  
  return (
    <div className='dashboard-div'>
      <div className='heading'>
        <h1>Welcome, { user && user.username } </h1>
        <p>Dashboard</p>
      </div>

      <div className='reviews-container'>
        {
          allReviews.length > 0 ? (
              <div className='reviews'>
                {
                  allReviews.map(review => <Review key={ review._id } reviewData={ review } />)
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