/* Just makes the http request and stores data in local storage */
import axios from 'axios';
import apiUrl from '../../utils/heroku-backend/apiConfig';

// const BASE_URL = import.meta.env.NODE_ENV == 'production' ? import.meta.env.VITE_BASE_URL_PROD : import.meta.env.VITE_BASE_URL_LOCAL;
// const API_URL = '/api/users';

//sign up a user
const signUp = async userData => {
  const response = await axios.post(apiUrl + '/users/register', userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

//login up a user
const login = async userData => {
  const response = await axios.post(apiUrl + '/users/login', userData);

  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

//logout user
const logout = async () => {
  localStorage.removeItem('user');
}

const authService = {
  signUp,
  login,
  logout
}

export default authService;