import axios from 'axios';
import apiUrl from '../utils/heroku-backend/apiConfig';

const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const addAlbumsToDB = async albumsData => {
  try {
    let res = await axios(`${apiUrl}/albums`, {
    method: 'POST',
    data: albumsData
    })
    
    console.log(res.data);
  
  } catch(e) {
    console.log({ insertionError: e.message });
  }
}

export const getAlbumsFromDB = async () => {
  try {
    let res = await axios.get(`${apiUrl}/albums`);
    
    return res.data.albums;

  } catch(e) {
    console.log({ retrievalError: e.message });
  }
}

export const getOneAlbumFromDB = async id => {
  try {
    let res = await axios.get(`${apiUrl}/albums/${id}`);
    
    return res.data.album;

  } catch(e) {
    console.log({ retrievalError: e.message });
  }
}

export const getReviews = async () => {
  const res = await axios(`${apiUrl}/reviews`, {
    method: 'GET',
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data.reviews;
}

export const addAReview = async reviewData => {
  if(reviewData.like == '')
    delete reviewData.like;
  if(reviewData.rating == '')
    delete reviewData.rating;
    
  try {
    let res = await axios(`${apiUrl}/reviews`, {
      method: 'POST',
      'headers': {
        'Authorization': `Bearer ${token}`
      },
      data: reviewData
    });
    
    if(res.status == 201)
      return true;

    return false

  } catch(e) {
    console.log({ insertionError: e.stack });
  }
}

export const editReview = async (id, updatedReviewData) => {
  try {
    let res = await axios(`${apiUrl}/reviews/${id}/edit`, {
      method: 'PUT',
      'headers': {
        'Authorization': `Bearer ${token}`
      },
      data: updatedReviewData
    });
    console.log(res)

    if(res.status == 400)
      throw new Error(`${res.data}`)
    
    if(res.status == 200)
      return true;

    return false

  } catch(e) {
    console.log({ insertionError: e.message });
  }
  
}