import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={`navbar-container ${sticky ? 'dark-nav' : ''}`}>
      <img src="../images/logo-white.png" alt="Logo" className="logo" />
      <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
        {/* Account Dropdown */}
        <li className="account-dropdown" onClick={toggleDropdown}>
          <span className="dropdown-toggle">Account</span>
          <ul className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
            <li><Link to="/signin">Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/Contact">Contact </Link></li>
        <li><Link to="/Qrcode">Qrcode</Link></li>
        
        
      </ul>
    </nav>
  );
};

export default Navbar;
