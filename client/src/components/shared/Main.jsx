import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Albums from '../pages/Albums';
import Album from '../pages/Album';
import AddReview from '../pages/AddReview';
import EditReview from '../pages/EditReview';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from './ErrorPage';
import { getAlbumsFromDB, getReviews } from '../../services/musicboxdApi';
import { reviewsContext } from '../../utils/reviewContext';
import { useEffect, useState } from 'react';
import AlbumInfo from '../pages/AlbumInfo';
import { albumsDataContext } from '../../utils/albumsContext';
import { useSelector } from 'react-redux';

const Main = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user } = useSelector(state => state.auth);
  const [albumDataDone, setAlbumDataDone] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if(user) {
        let info = await getReviews();
        setAllReviews(info);
      }
      if(!albumDataDone) {
        let albumsData = await getAlbumsFromDB();
        setAlbums(albumsData);
        setAlbumDataDone(prevState => !prevState);
      }
    }
    getData();
  }, []);

  return (
    <main>
      <reviewsContext.Provider value={{ allReviews }}>
        <albumsDataContext.Provider value={{ albums }}>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/albums' element={ <Albums /> } />
            <Route path='/albums/:id' element={ <Album /> } />
            <Route path='/reviews/:id' element={ <AlbumInfo /> } />
            <Route path='/albums/:id/add' element={ <AddReview /> } />
            <Route path='/reviews/:id/edit' element={ <EditReview /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/sign-up' element={ <SignUp /> } />
            <Route path='*' element={ <ErrorPage /> } />
          </Routes>
        </albumsDataContext.Provider>
      </reviewsContext.Provider>
    </main>
  )
}

export default Main;