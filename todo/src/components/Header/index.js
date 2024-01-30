import React from "react";
import { Link } from "react-router-dom";

const Header = ({ currentUser }) => {
  return (
    <header className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between w-100">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                {currentUser && (
                  <p className="mb-0">Logged in as {currentUser}</p>
                )}
                <Link className="nav-link" to="/register">
                  Register
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
