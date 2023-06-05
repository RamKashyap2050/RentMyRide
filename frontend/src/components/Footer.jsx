import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import "../styles/Footer.css"
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h3>RentMyRide</h3>
        <p className='footer-p'>RentMyRide is an innovative car rental application that offers users the convenience of renting a car based on half-day pay. With RentMyRide, users can easily search for available cars in their area, select the car that best fits their needs, and pay for only the time they need
</p>
      </div>
      <div className="footer-right">
        <div className="footer-column">
          <ul>
            <li>About Us</li><br />
            <li>Careers</li><br />
            <Link to='/feedback'><li>Feedback</li></Link>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect with Us</h3>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer