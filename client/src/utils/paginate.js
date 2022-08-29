import axios from 'axios';

//goes through the each page of a starting url and aggregates all the results
const paginate = async (url, token, list, keyword) => {
  while(url) {
    try {
      const response = await axios(url, {
        'method': 'GET',
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      });

      list = [...list, ...response.data[`${keyword}`].items];
      url = response.data[`${keyword}`].next;
    }
    catch(e) {
      console.log({ paginateError: e.message })
    }
  }
  
  return list;
}

export default paginate;