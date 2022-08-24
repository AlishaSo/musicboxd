import { useState, useEffect } from 'react';
import { getData } from '../../services/api';
import { nanoid } from 'nanoid';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let albums = await getData();
      console.log(albums);
      setAlbums(albums);
    }
    // fetchData();
  }, []);

  const displayAlbums = () => {
    return albums.map(album => {
      const nano = nanoid();
      return (
      <a 
        key = { nano } 
        className = 'album-link'
        href = { `${album.external_urls.spotify}` }
      >
        <img 
          className = 'album-art' 
          style = { { width:'150px', height:'150px' } } 
          src = { `${album.images[1].url}` } 
          alt = ''
        />
      </a>);
     })
  }

  return (
    <div className='albums-div'>
      { displayAlbums }
    </div>
  )
}

export default Albums;