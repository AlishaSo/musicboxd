import { NavLink } from 'react-router-dom';

const Footer = () => {

  return (
    <footer>
      <nav className='footer-links'>
        <NavLink className='footer-nav-link nav-link' to='/about'>ℹ️</NavLink>
        <NavLink className='footer-nav-link nav-link' to='/albums'>💿</NavLink>
        <NavLink className='footer-nav-link nav-link' to='/search'>🔍</NavLink>
      </nav>
      <p className='disclaimer'>Copyright © 2022 Alisha Soriano. All Rights Reserved</p>
    </footer>
  )
}

export default Footer;