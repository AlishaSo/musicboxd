import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Albums from '../pages/Albums';
import AddReview from '../pages/AddReview';
import EditReview from '../pages/EditReview';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ErrorPage from './ErrorPage';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/albums' element={ <Albums /> } />
        <Route path='/albums/:id' element={ <AddReview /> } />
        <Route path='/reviews/:id/edit' element={ <EditReview /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/sign-up' element={ <SignUp /> } />
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </main>
  )
}

export default Main;