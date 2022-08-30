import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneAlbumFromDB, addAReview } from '../../services/musicboxdApi';
import ReviewForm from '../shared/reviewForm';

const AddReview = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState({
    title: '',
    artist: '',
    albumCover: '',
    releaseDate: ''
  });
  const [reviewData, setReviewData] = useState({
    album: id,
    review: '',
    rating: 5,
    like: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = await getOneAlbumFromDB(id);
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

  const addReviewToDB = e => {
    e.preventDefault();

    addAReview(reviewData)
      .then(response => {
        if(response) {
          window.alert('The review was added successfully.');
          navigate('/dashboard');
        }
      })
    .catch(err => console.log({ reviewInsetionError: err.message }));
  }

  return (
    <div className='review-modal'>
      <div className='album-img'>
        <img src={ albumData.albumCover } alt={ `Album art for ${albumData.title} by ${albumData.artist}` } />
      </div>
      <ReviewForm 
        reviewData={ reviewData }
        handleChange={ handleChange }
        handleSubmit={ addReviewToDB }
        cancelPath={ `/albums` }
      />
    </div>
  )
}

export default AddReview;