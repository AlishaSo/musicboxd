import { Link } from 'react-router-dom';

const ReviewForm = props => {
  const { reviewData, handleChange, handleSubmit, cancelPath } = props;
  
  return (
    <div className='form-container'>
      <form onSubmit={ handleSubmit }>
        <input onChange={ e => handleChange(e) } type='text' placeholder={ reviewData.review ? reviewData.review : 'Add a review...' } name='review' value={ reviewData.review } />
      
          <div className='review-rating'>
            <label>Rating: </label>
            <input onChange={ e => handleChange(e) } type='number' min='1' max='5' name='rating' value={ reviewData.rating } placeholder={ reviewData.rating ? reviewData.rating : '' } />
          </div>
          <div className='review-like'>
            <label>Like: </label>
              <input onChange={ e => handleChange(e) } className='like-check' type='checkbox' name='like' value={ reviewData.like } checked={ reviewData.like } />
          </div>
      <button onClick={ handleSubmit } className='save-btn btn'>Save</button>
      </form>
      <Link to={ cancelPath } className='cancel-btn btn'>Cancel</Link>
    </div>
  )
}

export default ReviewForm;