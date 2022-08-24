import { useState, useEffect } from 'react';
import { getData } from '../../services/api';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let albums = await getData();
      // console.log(albums);
      setAlbums(albums);
    }
    fetchData();
  }, []);

  return (
    <div className='albums-div'>
      albums here
    </div>
  )
}

export default Albums;