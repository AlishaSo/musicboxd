import { useEffect, useState, useContext } from 'react';
import { getRandNewRelease } from '../../services/spotifyApi';
import { newReleasesContext } from '../../utils/spotifyContext';

const Home = () => {
  const [randAlbum, setRandAlbum] = useState({
    type: '',
    album: '',
    artist: '',
    spotifyUrl: '',
    id: '',
    image: ''
    //     id: randRelease.id,
  });
  const { newReleasesData } = useContext(newReleasesContext);
  
  useEffect(() => {
    if(newReleasesData.length > 0)
      setRandAlbum(() => getRandNewRelease(newReleasesData));
  }, [newReleasesData]);

  return (
    <div className='home-div'
    style={{ background: `url(${randAlbum && randAlbum.image}) no-repeat center/cover` }}>
      <h2>Track albums you've listened to.</h2>
      <h2>Save ones you'd like to listen to.</h2>
      <h2>Tell your friends what's good.</h2>
      
      <a href={ randAlbum && randAlbum.spotifyUrl }>{ randAlbum && randAlbum.albumName }</a>
    </div>
  )
}

export default Home;