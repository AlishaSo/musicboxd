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
            <p className="home-album-p">
              <a className="home-album-link" href={ randAlbum.spotifyUrl }>{ randAlbum.singleName }</a>
            </p>
        
            <div className='home-div-text'>
              <h2>
                Track albums you've listened to.<br/>
                Save ones you'd like to listen to.<br/>
                Tell your friends what's good.
              </h2>
            </div>
          </div>)
      }
    </>
  )
}

export default Home;