import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaCalendarAlt, FaUserCircle, FaShoppingCart } from 'react-icons/fa'

const UserHeader = () => {
  return (

    <div>
      <header>
        <div className="brand">
          <h1>RentMyRide</h1>
        </div>
        <nav>
          <ul>
            <Link to='/user/dashboard'>
              <li>
                <FaHome size={30} />
              </li>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/user/bookings'>
              <li>
                <FaCalendarAlt size={30} />
              </li>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/user'>
              <li className="account">
                <FaUserCircle size={30} />
              </li>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
          </ul>
        </nav>
      </header>  
    </div>
    
  )
}

export default UserHeader
