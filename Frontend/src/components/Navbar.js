import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar">
          <Link style={{textDecoration: 'none'}} to='/'>
            <h1>Sasta Kickstarter</h1>
          </Link>
          <div className='nav-text-right'>
            <Link style={{textDecoration: 'none'}} to = '/browse'>
              <h2>Browse</h2>
            </Link>
            <Link style={{textDecoration: 'none'}} to = '/myprojects'>
              <h2>My Projects</h2>
            </Link>
          </div>
        </div>
    </nav>
  )
}

export default Navbar