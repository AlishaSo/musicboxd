import axios from 'axios';
import apiUrl from '../../utils/api-host-backend/apiConfig';

const createReview = async (reviewData, token) => {
  const res = await axios(`${apiUrl}/reviews`, {
    method: 'POST',
    'headers': {
      'Authorization': `Bearer ${token}`
    },
    data: reviewData
  })

  return res.data;
}

const getReviews = async token => {
  const res = await axios(`${apiUrl}/reviews`, {
    method: 'GET',
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data.reviews;
}

const updateReview = async (reviewId, updateData, token) => {
  console.log('inside updateReview function')
  const res = await axios(`${apiUrl}/reviews/${reviewId}/edit`, {
    method: 'PUT',
    'headers': {
      'Authorization': `Bearer ${token}`
    },
    data: updateData
  })

  return res.data;
}

const deleteReview = async (reviewId, token) => {
  const res = await axios(`${apiUrl}/reviews/${reviewId}`, {
    method: 'DELETE',
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}

const reviewService = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
}

export default reviewService;