import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">Ther❤️ppy</div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/therapists" className="nav-link">Therapists</Link>
          </li>
          <li>
            <Link to="/clients" className="nav-link">Clients</Link>
          </li>
          <li>
            <Link to="/sessions" className="nav-link">Sessions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
