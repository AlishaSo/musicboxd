import axios from 'axios';
import { Buffer } from 'buffer';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const getToken = async () => {

  try {
    const tokenResponse = await axios(`https://accounts.spotify.com/api/token`, {
      'method': 'POST',
      'headers': { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${new Buffer.from(clientId + ':' + clientSecret).toString('base64')}`
      },
      data: 'grant_type=client_credentials'
    });

    return tokenResponse.data.access_token;
  }
  catch(e) {
    console.error(e);
  }
}

const getNewReleases = async () => {
  const token = await getToken();
  
  try {
    const newlyReleasedAlbums = await axios('https://api.spotify.com/v1/browse/new-releases?country=US&limit=50', {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    return newlyReleasedAlbums.data.albums.items;
  } catch(e) {
    return { Error: e.stack };
  }
}

const getAlbumTracks = async (id) => {
  const token = await getToken();
  
  try {
    const albumTracks = await axios(`https://api.spotify.com/v1/albums/${id}/tracks?limit=50`, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    return albumTracks.data.items;

  } catch(e) {
    return { Error: e.stack };
  }
}

const search = async (query) => {
  const token = await getToken();
  
  try {
    const result = await axios(`https://api.spotify.com/v1/search?q=album:${query}&type=album&limit=50`, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return result.data.albums;
    
  } catch(e) {
    return { Error: e.stack };
  }
}

export { getNewReleases, getAlbumTracks, search };