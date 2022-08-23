import axios from 'axios';
import { Buffer } from 'buffer';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const getToken = async () => {

  try {
    const tokenResponse = await axios(`https://accounts.spotify.com/api/token`, {
      'headers': { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${new Buffer.from(clientId + ':' + clientSecret).toString('base64')}`
      },
        data: 'grant_type=client_credentials',
        'method': 'POST'
    });

    return tokenResponse.data.access_token;
  }
  catch(e) {
    console.error(e);
  }
}

export { getToken };