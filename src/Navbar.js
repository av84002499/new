import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div class="topnav" id="myTopnav">
      <nav className="navbar navbar-expand-lg navbar-dark py-0 sticky-nav fade-in-top">
        <div className="container-fluid mainbar">
          <Link className="navbar-brand js-scroll-trigger" to="/">
            <img
              className="nav-logo-white"
              src="./images/logo-white.png"
              alt="logo img"
            />
            <img
              className="nav-logo-black"
              src="./images/logo-black.png"
              alt="logo img"
            />
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            onClick={closeNav}
          >
            <ul className="navbar-nav ms-auto my-0 my-md-2 my-lg-0">
              <li className="d-md-none d-lg-none">
                <button className="closebtn">x</button>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/getloginotp">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/userprofile">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
