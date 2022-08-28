import axios from 'axios';

//goes through the each page of a starting url and aggregates all the results
const paginate = async (url, token, list) => {
  while(url) {
    const response = await axios.get(url, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });
    
    list = [...list, ...response.data.albums.items];
    url = response.data.albums.next;
  }
  
  return list;
}

export default paginate;