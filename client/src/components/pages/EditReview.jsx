import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOneAlbumFromDB, editReview } from '../../services/musicboxdApi';
import ReviewForm from '../shared/reviewForm';

const EditReview = () => {
  const location = useLocation();
  const { data: currReviewInfo, redirect } = location.state;
  const [albumData, setAlbumData] = useState({
    title: '',
    artist: '',
    albumCover: '',
    releaseDate: ''
  });
  const [reviewData, setReviewData] = useState({
    album: currReviewInfo.album._id,
    review: currReviewInfo.review,
    rating: currReviewInfo.rating ? currReviewInfo.rating : '',
    like: currReviewInfo.like,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = await getOneAlbumFromDB(currReviewInfo.album._id);
      setAlbumData(data);
    }
    fetchData();
  }, []);
  
  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    setReviewData(prevReviewData => ({
      ...prevReviewData,
      [name]: type == 'checkbox' ? checked : value
    }));
  }

  const updateReviewInDB = e => {
    e.preventDefault();

    editReview(currReviewInfo._id, reviewData)
      .then(response => {
        if(response) {
          window.alert('The review was updated successfully.');
          navigate(redirect);
        }
      })
    .catch(err => console.log({ reviewUpdateError: err.message }))
  }

  return (
    <div className='edit-review-modal'>
      <div className='album-img'>
        <img src={ albumData && albumData.albumCover } alt={ `Album art for ${albumData && albumData.title} by ${albumData && albumData.artist}` } />
      </div>
      <ReviewForm 
        reviewData={ reviewData }
        currReviewInfo={ currReviewInfo }
        handleChange={ handleChange }
        handleSubmit={ updateReviewInDB }
        cancelPath={ `/dashboard` }
      />
    </div>
  )
}

export default EditReview;