import React, {useEffect} from 'react'
import { logout, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCar, FaUsers, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer';

const ProfilePageAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { Admin } = useSelector((state) => state.auth) 
    useEffect(() => {
        console.log('useEffect triggered with user:', Admin)
        if (!Admin){
          navigate('/loginadmin')
        }
      },[Admin,navigate])
  
      const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/loginadmin')
      }
      const addacar = () => {
        if(!Admin){
          navigate("/loginadmin")
        }
        else{
          navigate("/admin/addacar")
        }
      }
      const manageusers = () => {
        if(!Admin){
          navigate("/loginadmin")
        }
        else{
          navigate("/admin/manageusers")
        }
      }
      const managebookings = () => {
        if(!Admin){
          navigate("/loginadmin")
        }
        else{
          navigate("/admin/managebookings")
        }
      }
      const managecars = () => {
        if(!Admin){
          navigate("/loginadmin")
        }
        else{
          navigate("/admin/managecars")
        }
      }
      
  return (
   <>
    <AdminHeader />
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", marginTop:"5rem", textAlign:"center"}}>
  <h2>Admin Dashboard</h2><br /><br />
  <span style={{fontWeight:"bold"}}>{Admin?.user_name}</span>
  <span style={{fontWeight:"lighter"}}>{Admin?.email}</span><br />
  <button className='btn btn-block btn-info' style={{maxWidth:"300px"}} onClick={addacar}>
  <FaCar style={{marginRight:"1rem"}} />
  Add a Car
</button>
<button className='btn btn-block btn-info' style={{maxWidth:"300px"}} onClick={manageusers}>
  <FaUsers style={{marginRight:"1rem"}} />
  Manage User Accounts
</button>
<button className='btn btn-block btn-info' style={{maxWidth:"300px"}} onClick={managecars}>
  <FaCar style={{marginRight:"1rem"}} />
  Manage Cars
</button>
<button className='btn btn-block btn-info' style={{maxWidth:"300px"}} onClick={managebookings}>
  <FaClipboardList style={{marginRight:"1rem"}} />
  Manage User Bookings
</button>
<button className='btn btn-danger btn-block' style={{maxWidth:"300px"}} onClick={onLogout}>
  <FaSignOutAlt style={{marginRight:"1rem"}} />
  Logout
</button>
</div><br /><br />
<Footer />

   
   </>
  )
}

export default ProfilePageAdmin
