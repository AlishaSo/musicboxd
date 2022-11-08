import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaRecordVinyl, FaUserAstronaut } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
// import { useContext } from 'react';
// import { reviewsContext } from '../../utils/reviewContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { setAllReviews } = useContext(reviewsContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // useEffect(() => {
  //   const closeMenu = e => {
  //     console.log(e)
  //     if(e.originalTarget.tagName != 'BUTTON' && e.originalTarget.tagName != 'SPAN')
  //       setMenuOpen(false);
  //   }
  //   document.body.addEventListener('click', closeMenu);

  //   return () => document.body.addEventListener('click', closeMenu);
  // }, []);

  const profileClick = () => {
    navigate('/dashboard');
    navigate(0);
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    // setAllReviews(() => []);
    navigate('/');
  }

  return (
    <header className='bg-teal-ish'>
      <div className='wrapper'>
        {/* <button id='nav-toggle' className='nav-toggle' onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
          <span className='hamburguer'></span>
        </button> */}
        <Link className='logo nav-link text-dark-wine fs-3' to='/'>🎵🎧Musicboxd</Link>
        <nav className={`${menuOpen ? 'visible' : ''}`}>
          <NavLink className='nav-link' to='/albums'><button className='albums-btn header-nav-bnt btn text-dark-brown'><FaRecordVinyl /> Albums</button></NavLink>
          { user ? 
            (<>
              <button className='user-btn header-nav-bnt btn text-dark-brown' onClick={ profileClick }> <FaUserAstronaut /> { user.username }</button>
              <button className='logout-btn header-nav-bnt btn text-dark-brown' onClick={ onLogout }><FaSignOutAlt /> Logout</button>
            </>)
            :
            (<>
              <Link to='/login'><button className='user-btn header-nav-bnt btn text-dark-brown'>
                <FaSignInAlt /> Login
              </button></Link>
              <Link to='/sign-up'><button className='logout-btn header-nav-bnt btn text-dark-brown'>
                <FaUser /> Sign Up
              </button></Link>
            </>)
          }
          {/* <Link className='nav-link' to='/search'>🔍</Link> */}
        </nav>
      </div>
    </header>
  )
}

export default Header;