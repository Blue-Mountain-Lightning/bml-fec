import React from "react";
import MessageBar from './MessageBar.jsx';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div>
      <div className="section background-color-grey">
        <div className="container-large">
          <div className="page-padding">
            <nav className="nav-wrapper">
              <Link className="logo-link" to="/">👟 Thor Clothing ⚡️</Link>
            </nav>
          </div>
        </div>
      </div>
      <MessageBar />

    </div>
  )
}

export default NavBar