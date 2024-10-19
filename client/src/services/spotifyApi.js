import axios from 'axios';
import { Buffer } from 'buffer';
import getRandNum from '../utils/randNum';
import paginate from '../utils/paginate';
import { iterateToGetNames, iterateToGetAlbumIds } from '../utils/iterate';

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const token = localStorage.getItem('spotify-token') ? JSON.parse(localStorage.getItem('spotify-token')) : null;

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

    localStorage.setItem('spotify-token', JSON.stringify(tokenResponse.data.access_token));
  }
  catch(e) {
    console.error(e);
  }
}

//to get a list of spotify's "spotify singles: complete collection" playlist
const getSpotifySingles = async () => {
  let spotifySingles, nextPage;
  
  try {
    //fetch the spotify singles list from spotify
    const spotSingles = await axios('https://api.spotify.com/v1/playlists/37i9dQZF1DWTUm9HjVUKnL?fields=tracks%28next%2Citems.track%28album%28images%29%2Cexternal_urls%28spotify%29%2Cname%29&limit=50', {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    spotifySingles = spotSingles.data.tracks.items;  //assign the singles you just fetched to the 'spotifySingles' variable
    /* nextPage = spotSingles.data.tracks.next;

    if(nextPage)
      spotifySingles = await paginate(nextPage, token, spotifySingles, 'albums');  //if there's a next page, call the paginate function to add the items from the subsequent pages */

    return spotifySingles;  //return the full list of spotify singles

  } catch(e) {
    return { Error: e.stack };
  }
}

const getRandNewSingle = singlesArr => {
  try {
    const randIndex = getRandNum(singlesArr.length);
    let randSingle = singlesArr[randIndex];
    const randomNewSingle = {
      singleName: randSingle.track.name,
      spotifyUrl: randSingle.track.external_urls.spotify,
      image: randSingle.track.album.images[0].url
    }

    return randomNewSingle;

  } catch(e) {
    return { Error: e.stack };
  }
}

//to get a list of spotify's featured playlists
const getFeaturedPlaylists = async () => {
  let featuredPlaylists, nextPage;
  
  try {
    //fetch the new releases list from spotify
    const fP = await axios('https://api.spotify.com/v1/browse/categories/toplists?locale=en_US&limit=50', {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log(fP.data);
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
    const tracks = await axios(`https://api.spotify.com/v1/${type}/${id}?fields=tracks.items.track%28album%28id%29%29&limit=50`, {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    });

    return tracks.data.tracks.items;

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
console.log(albumsIds);
  return albumsIds;
}

const filterAlbumData = albumsDataArr => {
  return albumsDataArr.map(album => ({
      title: album.name,
      artist: album.artists[0].name,
      albumCover: album.images[0].url,
      releaseDate: album.release_date
    })
  )
}

//to get the album details from the spotify top albums - global playlist
const AggregateAlbumDetails = async albumsIdsArr => {
  const firstTwentyIds = albumsIdsArr.slice(0, 20).join(',');
  const secondTwentyIds = albumsIdsArr.slice(20, 40).join(',');
  const lastTenIds = albumsIdsArr.slice(40).join(',');

  let relevantAlbumsData;

  let albumsData = await fetchAlbumDetails(firstTwentyIds);
  
  albumsData = [...albumsData, ...await fetchAlbumDetails(secondTwentyIds)];
  
  albumsData = [...albumsData, ...await fetchAlbumDetails(lastTenIds)];
  
  relevantAlbumsData = filterAlbumData(albumsData);

  return relevantAlbumsData;
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

const getAlbumsObjsData = async () => {
  let albumsIds = await getAlbumIds();
  let albumsObjsData = await AggregateAlbumDetails(albumsIds);

  return albumsObjsData;
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
  getSpotifySingles, 
  getRandNewSingle,
  getFeaturedPlaylists, 
  getAlbumsObjsData,
  search 
};