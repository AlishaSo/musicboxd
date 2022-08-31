let apiUrl;

const apiUrls = {
  production: 'https://musicboxd.herokuapp.com/api',
  development: 'http://localhost:3500/api'
}

window.location.hostname === 'localhost' ?
  apiUrl = apiUrls.development
  :
  apiUrl = apiUrls.production

export default apiUrl;