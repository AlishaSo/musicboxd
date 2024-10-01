import { useEffect, useState, useContext } from 'react';
import { getRandNewSingle } from '../../services/spotifyApi';
import { newSinglesContext } from '../../utils/spotifyContext';
import Spinner from '../shared/Spinner';

const Home = () => {
  const [randAlbum, setRandAlbum] = useState({
    single: '',
    spotifyUrl: '',
    image: ''
  });
  const { newSinglesData } = useContext(newSinglesContext);
  
  useEffect(() => {
    if(newSinglesData.length > 0)
      setRandAlbum(() => getRandNewSingle(newSinglesData));
  }, [newSinglesData]);

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
          
            <a className='home-album-link' href={ randAlbum.spotifyUrl }>{ randAlbum.singleName }</a>
        </div>)
      }
    </>
  )
}

export default Home;