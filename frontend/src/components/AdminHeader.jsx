import React from 'react'
import { Link } from 'react-router-dom'
const AdminHeader = () => {
  return (
    <div>
      <>
<header>
<div className="brand">
  <h2>RentMyRide</h2>
</div>
<nav>
  <ul>
    <Link to='/admin'><li className="account">Dashboard <i className="fas fa-user"></i></li></Link>
  </ul>
</nav>
</header>
</>
    </div>
  )
}

export default AdminHeader
