import { useEffect, useState, useContext } from 'react';
import { getRandNewRelease } from '../../services/spotifyApi';
import { newReleasesContext } from '../../utils/spotifyContext';
import Spinner from '../shared/Spinner';

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
    <>
      { 
        Object.entries(randAlbum).length == 0 ?
        <Spinner />
        :
        (<div 
          className='home-div'
          style={{ background: `url(${randAlbum.image}) no-repeat top/100%` }}
          >
            <div className='home-div-text'>
              <h2>Track albums you've listened to.</h2>
              <h2>Save ones you'd like to listen to.</h2>
              <h2>Tell your friends what's good.</h2>
            </div>
          
            <a className='home-album-link' href={ randAlbum.spotifyUrl }>{ randAlbum.albumName }</a>
        </div>)
      }
    </>
  )
}

export default Home;