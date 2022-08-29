import axios from 'axios';
import { Buffer } from 'buffer';
import getRandNum from '../utils/randNum';
import paginate from '../utils/paginate';
import { iterateToGetNames, iterateToGetAlbumIds } from '../utils/iterate';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;

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

    localStorage.setItem('token', JSON.stringify(tokenResponse.data.access_token));
  }
  catch(e) {
    console.error(e);
  }
}

//to get a list of spotify's weekly releases
const getNewReleases = async () => {
  let newReleases, nextPage;
  
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
      newReleases = await paginate(nextPage, token, newReleases, 'albums');  //if there's a next page, call the paginate function to add the items from the subsequent pages

    return newReleases;  //return the full list of new releases

  } catch(e) {
    return { Error: e.stack };
  }
}

const getRandNewRelease = newReleasesArr => {
  try {
    const randIndex = getRandNum(newReleasesArr.length);
    let randRelease = newReleasesArr[randIndex];
    const randomNewRelease = {
      type: randRelease.album_type,
      albumName: randRelease.name,
      artist: randRelease.artists.length == 1 ? randRelease.artists[0].name : iterateToGetNames(randRelease.artists),
      spotifyUrl: randRelease.external_urls.spotify,
      id: randRelease.id,
      image: randRelease.images[0].url
    }

    return randomNewRelease;

  } catch(e) {
    return { Error: e.stack };
  }
}

//to get a list of spotify's featured playlists
const getFeaturedPlaylists = async () => {
  let featuredPlaylists, nextPage;
  
  try {
    //fetch the new releases list from spotify
    const fP = await axios('https://api.spotify.com/v1/browse/categories/toplists?country=US&limit=50', {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log(fP.data)
    featuredPlaylists = fP.data.categories.items;  //assign the albums you just fetched to the 'newReleases' variable
    nextPage = fP.data.categories.next;

    // if(nextPage)
    //   featuredPlaylists = await paginate(nextPage, token, featuredPlaylists, 'categories');  //if there's a next page, call the paginate function to add the items from the subsequent pages
    return featuredPlaylists;  //return the full list of new releases

  } catch(e) {
    return { Error: e.stack };
  }
}

//to get the tracks info from a playlist or album
const getTracks = async (type, id) => {
  try {
    const tracks = await axios(`https://api.spotify.com/v1/${type}/${id}/tracks?limit=50`, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    return tracks.data.items;

  } catch(e) {
    return { Error: e.stack };
  }
}

//to get the album details from the spotify top albums - global playlist
const getAlbumIds = async () => {
  const topGlobalId = '7qWT4WcLgV6UUIPde0fqf9';
  const topGlobalType = 'playlists';

  const topGlobalData = await getTracks(topGlobalType, topGlobalId);

  const albumsIds = iterateToGetAlbumIds(topGlobalData);

  return albumsIds;
}

//to get the album details from the spotify top albums - global playlist
const AggregateAlbumDetails = async albumsIdsArr => {
  const firstTwentyIds = albumsIdsArr.slice(0, 20).join(',');
  const secondTwentyIds = albumsIdsArr.slice(20, 40).join(',');
  const lastTenIds = albumsIdsArr.slice(40).join(',');

  let albumsData = await fetchAlbumDetails(firstTwentyIds);
  
  albumsData = [...albumsData, ...await fetchAlbumDetails(secondTwentyIds)];
  
  albumsData = [...albumsData, ...await fetchAlbumDetails(lastTenIds)];
  
  return albumsData;
}

//gets album details for several albums at once
const fetchAlbumDetails = async idsString => {
  try {
    let albumsData = await axios(`https://api.spotify.com/v1/albums?ids=${idsString}`, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    return albumsData.data.albums;

  } catch(e) {
    return { Error: e.stack };
  }
}

//to search for a specified album in the spotify api
const search = async (query) => {
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
  getToken,
  getNewReleases, 
  getRandNewRelease,
  getFeaturedPlaylists, 
  getTracks, 
  getAlbumIds,
  AggregateAlbumDetails,
  search 
};