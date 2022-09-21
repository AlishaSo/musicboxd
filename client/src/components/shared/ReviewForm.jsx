import { Link } from 'react-router-dom';

const ReviewForm = props => {
  const { reviewData, handleChange, handleSubmit, cancelPath } = props;
  
  return (
    <div className='form-container'>
      <form onSubmit={ handleSubmit }>
        <textarea 
          onChange={ e => handleChange(e) }
          className='textarea-input' 
          name='review' 
          value={ reviewData.review } 
          rows='3' 
          cols='33'
        >
          { reviewData.review ? reviewData.review : 'Add a review...' }
        </textarea>
      
          <div className='review-rating'>
            <label>Rating: </label>
            <input onChange={ e => handleChange(e) } type='number' min='1' max='5' name='rating' value={ reviewData.rating } placeholder={ reviewData.rating ? reviewData.rating : '' } />
          </div>
          <div className='review-like'>
            <label>Like: </label>
              <input onChange={ e => handleChange(e) } className='like-check' type='checkbox' name='like' value={ reviewData.like } checked={ reviewData.like } />
          </div>
      <button onClick={ handleSubmit } className='save-btn btn'>Save</button>
      <Link to={ cancelPath } className='cancel-btn btn'>Cancel</Link>
      </form>
    </div>
  )
}

export default ReviewForm;