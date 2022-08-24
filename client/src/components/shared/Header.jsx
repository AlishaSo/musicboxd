import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = e => {
      console.log(e)
      if(e.originalTarget.tagName != 'BUTTON' && e.originalTarget.tagName != 'SPAN')
        setMenuOpen(false);
    }
    document.body.addEventListener('click', closeMenu);

    return () => document.body.addEventListener('click', closeMenu);
  }, []);

  return (
    <header>
      <div className='wrapper'>
        <button id='nav-toggle' className='nav-toggle' onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}>
          <span className='hamburguer'></span>
        </button>
        <NavLink className='logo nav-link' to='/'>🎵🎧Musicboxd</NavLink>
        <nav className={`${menuOpen ? 'visible' : ''}`}>
          <NavLink className='nav-link' to='/albums'>Albums</NavLink>
          <NavLink className='nav-link' to='/sign-in'>Sign In</NavLink>
          <NavLink className='nav-link' to='/sign-up'>Sign Up</NavLink>
          <NavLink className='nav-link' to='/search'>🔍</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header;