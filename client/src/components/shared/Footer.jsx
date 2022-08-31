import { Link } from 'react-router-dom';
import { FaUserAstronaut, FaRecordVinyl, FaHome } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer>
      <nav className='footer-links'>
        <Link className='footer-nav-link' to='/dashboard'><FaUserAstronaut /></Link>
        <Link className='footer-nav-link' to='/'><FaHome/></Link>
        <Link className='footer-nav-link' to='/albums'><FaRecordVinyl /></Link>
      </nav>
      <p className='disclaimer'>Copyright © 2022 Alisha Soriano. All Rights Reserved</p>
    </footer>
  )
}

export default Footer;