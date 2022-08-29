import Header from './components/shared/Header';
import Layout from "./components/shared/Layout";
import { useEffect, useState } from 'react';
import { newReleasesContext, albumsDataContext } from './utils/spotifyContext';
import { getToken, getNewReleases, getAlbumIds, AggregateAlbumDetails, getTracks } from './services/spotifyApi';

function App() {
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [topGlobalAbumsData, setTopGlobalAbumsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await getToken();
      // let data = await getNewReleases();
      // setNewReleasesData(data);
      // const albumIds = await getAlbumIds();
      // const albumDetails = await AggregateAlbumDetails(albumIds);
      // console.log(albumDetails);
      // setTopGlobalAbumsData(albumDetails);
    }
    getData();
  }, []);

  return (
    <div className='App'>
      <newReleasesContext.Provider value = {{ newReleasesData }}>
        <Header />
        <Layout />
      </newReleasesContext.Provider>
    </div>
  )
}

export default App;
