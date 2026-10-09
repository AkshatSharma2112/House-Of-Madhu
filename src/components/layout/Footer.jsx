import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Import logo images
import yarnLogo from '../../assets/yarn-logo.png';
import houseOfMadhuText from '../../assets/house-of-madhu-text.png';

const Footer = () => {

  // ⚠️ CHANGE THIS to your actual Instagram username
  const INSTAGRAM_USERNAME = 'houseofmadhu'; // ← Replace with your Instagram handle
  const instagramUrl = `https://instagram.com/${INSTAGRAM_USERNAME}`;

  // Open the existing Madhu chatbot
  const handleFAQClick = (e) => {
    e.preventDefault();

    window.dispatchEvent(
      new Event('open-madhu-chatbot')
    );
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* ===== BRAND SECTION ===== */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img
                src={yarnLogo}
                alt="House of Madhu Icon"
                className="footer-logo-icon"
              />

              <img
                src={houseOfMadhuText}
                alt="House of Madhu"
                className="footer-logo-text"
              />
            </Link>

            <p className="footer-tagline">
              Handmade crochet with love and care.
            </p>
          </div>


          {/* ===== QUICK LINKS & SUPPORT ===== */}
          <div className="footer-links">

            {/* Quick Links */}
            <div>
              <h4>Quick Links</h4>

              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/shop">Shop</Link>
                </li>

                <li>
                  <Link to="/custom-orders">
                    Custom Orders
                  </Link>
                </li>

                <li>
                  <Link to="/about">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>


            {/* Support */}
            <div>
              <h4>Support</h4>

              <ul>
                <li>
                  <Link to="/support#shipping">
                    Shipping Info
                  </Link>
                </li>

                <li>
                  <Link to="/support#returns">
                    Returns
                  </Link>
                </li>

                {/* FAQ → Opens Madhu Chatbot */}
                <li>
                  <a
                    href="#faq"
                    onClick={handleFAQClick}
                  >
                    FAQ
                  </a>
                </li>

                <li>
                  <Link to="/support#privacy">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

          </div>


          {/* ===== SOCIAL & CONTACT ===== */}
          <div className="footer-social">

            <h4>Follow Us</h4>

            <div className="social-icons">
              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="social-icon instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <p className="footer-email">
              houseofmadhu04@gmail.com
            </p>

          </div>

        </div>


        {/* ===== FOOTER BOTTOM ===== */}
        <div className="footer-bottom">
          <p>
            © 2026 House of Madhu. All rights reserved.
            Made with ❤️ and 🧶
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;