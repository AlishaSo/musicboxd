import { useEffect, useState } from 'react';
import { getNewReleases, getRandNewRelease } from '../../services/api';
import iterateArr from '../../utils/iterate';

const Home = () => {
  const [randAlbum, setRandAlbum] = useState({
    type: '',
    album: '',
    artist: '',
    spotifyUrl: '',
    id: '',
    image: ''
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     // let newReleases = await getNewReleases();
  //     // console.log(newReleases);
  //     // let release = await getRandNewRelease();
  //     // console.log(release);
  //     setRandAlbum(() => ({
  //       type: release.album_type,
  //       albumName: release.name,
  //       artist: release.artists.length == 1 ? release.artists[0].name : iterateArr(release.artists),
  //       spotifyUrl: release.external_urls.spotify,
  //       id: release.id,
  //       image: release.images[0].url
  //     }))
  //   }
  //   getData();
  // }, []);

  // console.log(randAlbum);

  return (
    <div className='home-div' >
    {/* style={{ background: `url(${randAlbum.image}) no-repeat center/cover` }}> */}
      <h2>Track albums you've listened to.</h2>
      <h2>Save ones you'd like to listen to.</h2>
      <h2>Tell your friends what's good.</h2>
      
      {/* <a href={ randAlbum.spotifyUrl }>{ randAlbum.albumName }</a> */}
    </div>
  )
}

export default Home;