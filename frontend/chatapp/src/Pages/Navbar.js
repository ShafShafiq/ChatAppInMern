import React from 'react';
import { NavLink } from 'react-router-dom';

const handleLogout = () => {
  localStorage.removeItem('C_token');
  window.location.href = '/';
};

function Navbar() {
  const isLoggedIn = localStorage.getItem('C_token') !== null;

  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <button  id='logout-button' onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
