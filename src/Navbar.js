import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Handler for navigation toggle (handled through CSS class changes or custom logic as needed)
  const toggleNav = () => {
    const sidenav = document.getElementById("mySidenav");
    const currentWidth = sidenav.style.width;
    sidenav.style.width = currentWidth === '250px' ? '0' : '250px';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-0">
      <div className="container-fluid">
        <Link className="navbar-brand js-scroll-trigger" to="/">
          <img className="nav-logo img-fluid" src="../images/logo-white.png" alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNav} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="sidenav" id="mySidenav">
          <ul className="navbar-nav ms-auto">
            <li>
              <Link className="nav-link js-scroll-trigger" to="/home" onClick={toggleNav}>Home</Link>
            </li>
            <li>
              <Link className="nav-link js-scroll-trigger" to="/signin" onClick={toggleNav}>Sign in</Link>
            </li>
            <li>
              <Link className="nav-link js-scroll-trigger" to="/signup" onClick={toggleNav}>Sign up</Link>
            </li>
          </ul>
          <button className="closebtn" onClick={toggleNav}>&times;</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
