import Header from './components/shared/Header';
import Layout from "./components/shared/Layout";
import { useEffect, useState } from 'react';
import { newReleasesContext } from './utils/spotifyContext';
import { getToken, getNewReleases, getAlbumsObjsData } from './services/spotifyApi';
import { addAlbumsToDB } from './services/musicboxdApi';
import filterDuplicates from './utils/filterDuplicates';

function App() {
  const [newReleasesData, setNewReleasesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await getToken();
      let data = await getNewReleases();
      setNewReleasesData(data);
      let albumDetails = await getAlbumsObjsData();
      albumDetails = filterDuplicates(albumDetails);
      console.log(albumDetails);
      await addAlbumsToDB(albumDetails);
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
