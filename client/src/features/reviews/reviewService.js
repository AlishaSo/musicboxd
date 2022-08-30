import axios from 'axios';

const BASE_URL = import.meta.env.NODE_ENV == 'production' ? import.meta.env.VITE_BASE_URL_PROD : import.meta.env.VITE_BASE_URL_LOCAL;
const API_URL = '/api/reviews';

// const createReview = async (reviewData, token) => {
//   const res = await axios(`${BASE_URL}${API_URL}`, {
//     method: 'POST',
//     'headers': {
//       'Authorization': `Bearer ${token}`
//     },
//     data: reviewData
//   })

//   return res.data;
// }

const getReviews = async token => {
  const res = await axios(`${BASE_URL}${API_URL}`, {
    method: 'GET',
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data.reviews;
}

// const updateReview = async (reviewId, updateData, token) => {
//   console.log('inside updateReview function')
//   const res = await axios(`${BASE_URL}${API_URL}/${reviewId}/edit`, {
//     method: 'PUT',
//     'headers': {
//       'Authorization': `Bearer ${token}`
//     },
//     data: updateData
//   })

//   return res.data;
// }

const deleteReview = async (reviewId, token) => {
  const res = await axios(`${BASE_URL}${API_URL}/${reviewId}`, {
    method: 'DELETE',
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data;
}

const reviewService = {
  // createReview,
  getReviews,
  // updateReview,
  deleteReview
}

export default reviewService;