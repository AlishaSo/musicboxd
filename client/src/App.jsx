import Header from './components/shared/Header';
import Layout from "./components/shared/Layout";
import { useEffect, useState } from 'react';
import { newSinglesContext } from './utils/spotifyContext';
import { getToken, getSpotifySingles, getAlbumsObjsData } from './services/spotifyApi';
import { addAlbumsToDB } from './services/musicboxdApi';
import filterDuplicates from './utils/filterDuplicates';

function App() {
  const [newSinglesData, setNewSinglesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await getToken();
      let data = await getSpotifySingles();
      setNewSinglesData(data);
      let albumDetails = await getAlbumsObjsData();
      albumDetails = filterDuplicates(albumDetails);
      await addAlbumsToDB(albumDetails);
    }
    getData();
  }, []);

  return (
    <div className='App'>
      <newSinglesContext.Provider value = {{ newSinglesData }}>
        <Header />
        <Layout />
      </newSinglesContext.Provider>
    </div>
  )
}

export default App;
