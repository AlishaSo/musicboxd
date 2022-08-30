import { useState, useEffect } from 'react';
import { getAlbumsFromDB } from '../../services/musicboxdApi';
import { Link } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let albumsData = await getAlbumsFromDB();
      setAlbums(albumsData);
    }
    fetchData();
  }, []);

  const displayAlbums = () => {
    return albums.map(album => {
      return (
        <Link key={ album._id } to={ `/albums/${album._id}` }>
          <img 
            key={ `img-${album._id}` } 
            className = 'album-art' 
            src = { `${album.albumCover}` } 
            alt = ''
          />
        </Link>);
     })
  }

  return (
    <div className='albums-div'>
      { displayAlbums() }
    </div>
  )
}

export default Albums;