import { Link } from 'react-router-dom';
import { FaUserAstronaut, FaRecordVinyl, FaHome } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className='bg-teal-ish'>
      <nav className='footer-links'>
        <Link className='footer-nav-link text-dark-brown' to='/dashboard'><FaUserAstronaut /></Link>
        <Link className='footer-nav-link text-dark-brown' to='/'><FaHome/></Link>
        <Link className='footer-nav-link text-dark-brown' to='/albums'><FaRecordVinyl /></Link>
      </nav>
      <p className='disclaimer'>Copyright © 2024 Alisha Soriano. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer;