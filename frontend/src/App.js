import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePageAdmin from './pages/ProfilePageAdmin';
import LoginforAdmin from './pages/LoginforAdmin';
import LoginUser from './pages/LoginUser';
import ProfilePageUser from './pages/ProfilePageUser';
import SignupforUser from './pages/Signupuser';
import Addacar from './pages/Addacar';
import ManageUsers from './pages/ManageUsers';
import ManageUserBookings from './pages/ManageUserBookings';
import UserDashboard from './pages/UserDashboard';
import UserBookings from './pages/UserBookings';
import ManageCars from './pages/ManageCars';

function App() {
  return (
    <>
    <BrowserRouter >
        <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/admin' element={<ProfilePageAdmin />}/>
        <Route path='/loginadmin' element={<LoginforAdmin />}/>
        <Route path='/loginuser' element={<LoginUser />} />
        <Route path='/user' element={<ProfilePageUser />} />
        <Route path='/signupuser' element={<SignupforUser />}/> 
        <Route path='/admin/addacar' element={<Addacar />} />
        <Route path='/admin/manageusers' element={<ManageUsers />} />
        <Route path='/admin/managebookings' element={<ManageUserBookings />} />
        <Route path='/admin/managecars' element={<ManageCars />} />
        <Route path='/user/dashboard' element={<UserDashboard />}/>
        <Route path='/user/bookings' element={< UserBookings />}/>
        </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
    
  );
}

export default App;
