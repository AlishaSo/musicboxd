import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Albums from '../pages/Albums';
import ErrorPage from './ErrorPage';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/albums' element={ <Albums /> } />
        {/* <Route path='/sign-in' element={ <SignIn /> } />
        <Route path='/sign-up' element={ <SignUp /> } />
        <Route path='/search' element={ <Search /> } /> */}
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </main>
  )
}

export default Main;