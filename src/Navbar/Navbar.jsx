import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${sticky ? 'dark-nav' : ''}`}>
      <img src="../images/logo1.png" alt="Logo" className="logo" />
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? 'menu-bar open' : 'menu-bar'}></span>
        <span className={menuOpen ? 'menu-bar open' : 'menu-bar'}></span>
        <span className={menuOpen ? 'menu-bar open' : 'menu-bar'}></span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link className="nav-link" to="/signin" onClick={() => setMenuOpen(false)}>Sign in</Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup" onClick={() => setMenuOpen(false)}>Sign up</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
