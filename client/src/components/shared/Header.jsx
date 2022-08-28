import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaRecordVinyl, FaUserAstronaut } from 'react-icons/fa'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header>
      <div className='wrapper'>
        <button id='nav-toggle' className='nav-toggle' onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
          <span className='hamburguer'></span>
        </button>
        <Link className='logo nav-link' to='/'>🎵🎧Musicboxd</Link>
        <nav className={`${menuOpen ? 'visible' : ''}`}>
          <NavLink className='nav-link' to='/albums'><FaRecordVinyl /> Albums</NavLink>
          { user ? 
            (<>
              <button className='user-btn' onClick={ profileClick }> <FaUserAstronaut /> { user.username }</button>
              <button className='logout-btn btn' to='/login' onClick={ onLogout }><FaSignOutAlt /> Logout</button>
              </>
            )
            :
            (<>
              <Link className='nav-link' to='/login'><FaSignInAlt /> Login</Link>
              <Link className='nav-link' to='/sign-up'><FaUser /> Sign Up</Link></>)
          }
          <Link className='nav-link' to='/search'>🔍</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;