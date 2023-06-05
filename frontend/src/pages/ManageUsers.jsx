import React,{ useEffect, useState} from 'react'
import Axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import '../styles/AllUserAdmin.css'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import { Buffer } from 'buffer'
import { toast } from 'react-toastify'


const ManageUsers = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const { Admin } = useSelector((state) => state.auth) 
  
  useEffect(() => {
    console.log('useEffect triggered with user:', Admin)
    if (!Admin){
      navigate('/loginadmin')
    }
  },[Admin,navigate])
  //This will fetch all users for Admin for Blocking and Unblocking Purposes
  useEffect(() => {
      Axios.get("http://localhost:3004/Admin/getallUsers").then((response) => {
    setResults(response.data)
    console.log(response.data)
    })
    },[])
    //This will do Blocking and Unblocking
    const blockUser = (key) => {
      Axios.put(`http://localhost:3004/Admin/updatetofalse/${key}`)
      toast.success('Blocked succesfully')
    }
    const unblockUser = (key) => {
      Axios.put(`http://localhost:3004/Admin/updatetotrue/${key}`)
      toast.success('Unblocked succesfully')
    }

  const imageUrls = results.map(user => {
    const imageBuffer = user?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });

  return (<>
  <AdminHeader />
    <div className='results'>

      <h1 className='brand'>List of Users</h1>
        Total Users {results.length} :-
        <div>
            <table>
                  <thead>
                    <tr>
                      <th>Profile Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Unblock</th>
                      <th>Block</th>
                    </tr>
                </thead>
                <tbody>
                {results.map((val,key) => (
  <tr key={key}>
    {imageUrls.map((imageUrl, index) => (
      index === key ? (
        <td key={index}>
          {imageUrl && <img className='Dashboardprofilephoto' src={imageUrl} alt='User profile' />}
        </td>
      ) : null
    ))}
    <td>{val.user_name}</td>
    <td>{val.email}</td>
    <td>{val.phone}</td>
    <td>
    <button className='btn-primary' onClick={() => {unblockUser(val._id)}}>
        Unblock
      </button>
    </td> 
    <td>
    <button className='btn-danger' onClick={() => {blockUser(val._id)}}>
        Block
      </button>
    </td>
  </tr>
))}


              </tbody>
              
          </table><br /><br />

        </div>
    </div>
    <Footer />
    </>
  )
}

export default ManageUsers
