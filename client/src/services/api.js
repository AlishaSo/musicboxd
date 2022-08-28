import axios from 'axios';
import { Buffer } from 'buffer';
import getRandNum from '../utils/randNum';
import paginate from '../utils/paginate';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

let newReleases;

//to get a user token from the spotify api
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

//to get a list of spotify's weekly releases
const getNewReleases = async () => {
  const token = await getToken();
  let nextPage;
  
  try {
    //fetch the new releases list from spotify
    const newlyReleasedAlbums = await axios('https://api.spotify.com/v1/browse/new-releases?country=US&limit=50', {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    newReleases = newlyReleasedAlbums.data.albums.items;  //assign the albums you just fetched to the 'newReleases' variable
    nextPage = newlyReleasedAlbums.data.albums.next;

    if(nextPage)
      newReleases = await paginate(nextPage, token, newReleases);  //if there's a next page, call the paginate function to add the items from the subsequent pages

    return newReleases;  //return the full list of new releases

  } catch(e) {
    return { Error: e.stack };
  }
}

const getRandNewRelease = async () => {
  try {
    const randIndex = getRandNum(newReleases.length);
    const randomNewRelease = newReleases[randIndex];

    return randomNewRelease;

  } catch(e) {
    return { Error: e.stack };
  }
}

//to get the tracks from a specified album
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

//to search for a specified album in the spotify api
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

export { 
  getNewReleases, 
  getRandNewRelease, 
  getAlbumTracks, 
  search 
};