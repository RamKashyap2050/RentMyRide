import React from 'react';
import { Link } from 'react-router-dom';
import freeSampleImage from '../assets/logo.jpg';
import '../styles/LandingPage.css'
const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <h1>RentMyRide</h1><br />
      <Link to='/'>
      <img src={freeSampleImage} alt='Free sample' className='landingpageimg' /><br /><br />
      </Link>
      <Link to='/loginadmin'>
        <button className='landingpage-btn-danger'>As a Admin</button>
      </Link><br />
      <Link to='/loginuser'>
        <button className='landingpage-btn-primary'>As a User</button>
      </Link>
    </div>
  )
}

export default LandingPage;
