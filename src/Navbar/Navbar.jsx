import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for detecting clicks outside the navbar
  const navRef = useRef();

  useEffect(() => {
    // Handle scroll for sticky navbar
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    // Detect clicks outside the navbar
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false); // Close mobile menu
        setDropdownOpen(false);   // Close dropdown
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav ref={navRef} className={`navbar-container ${sticky ? 'dark-nav' : ''}`}>
      <a href="/Home">
        <img src="../images/logo-white.png" alt="Logo" className="logo" />
      </a>
      <div className={`menu-icon ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>

        {/* Account Dropdown */}
        <li className="account-dropdown" onClick={toggleDropdown}>
          <span className="dropdown-toggle">Account</span>
          <ul className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
            <li>
              <Link to="/Signin" onClick={() => setMobileMenuOpen(false)}>Signin</Link>
            </li>
            <li>
              <Link to="/Signup" onClick={() => setMobileMenuOpen(false)}>Signup</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/About" onClick={() => setMobileMenuOpen(false)}>About us</Link>
        </li>
        <li>
          <Link to="/Contact" onClick={() => setMobileMenuOpen(false)}>Contact us</Link>
        </li>
        <li>
          <Link to="/Qrcode" onClick={() => setMobileMenuOpen(false)}>Scan</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
