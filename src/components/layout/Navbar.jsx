import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

// Import logo images
import yarnLogo from '../../assets/yarn-logo.png';
import houseOfMadhuText from '../../assets/house-of-madhu-text.png';

const Navbar = () => {
  const location = useLocation();
  const { isAdmin, adminLogout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on the admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/custom-orders', label: 'Custom Orders' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    adminLogout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src={yarnLogo} alt="House of Madhu Icon" className="logo-icon" />
          <img src={houseOfMadhuText} alt="House of Madhu" className="logo-text-img" />
        </Link>

        {/* Hamburger Menu */}
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* 🔐 Admin Link - Only shown when admin is logged in AND not on admin page */}
          {isAdmin && !isAdminPage && (
            <li>
              <Link to="/admin" className="nav-link admin-link" onClick={closeMobileMenu}>
                ⚙️ Admin Panel
              </Link>
            </li>
          )}

          {/* 🔐 Logout - Only shown on admin page */}
          {isAdmin && isAdminPage && (
            <li>
              <button onClick={handleLogout} className="nav-link admin-logout-btn">
                🚪 Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;