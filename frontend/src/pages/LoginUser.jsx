import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import freeSampleImage from '../assets/logo.jpg';

// import '../styles/LoginforUser.css'
// import ContactUs from '../components/ContactUs'
function LoginUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }


    if (isSuccess || user) {

      navigate('/user')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    const result = dispatch(login(userData))    
  }

 

  return (
    <>
<section style={{ display: 'flex', padding:"2rem" }}>
  <section className='form-container' style={{ flex: '1', textAlign:"center" }}>
    <section className='heading' style={{ marginBottom: '2rem' }}>
      <h1>Login User</h1>
    </section>
    <Link to='/'>
      <img src={freeSampleImage} alt='ss' /> <br /><br />
    </Link>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          id='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          value={password}
          placeholder='Enter password'
          onChange={onChange}
        />
      </div>

      <div className='form-group'>
        <button type='submit' className='btn btn-block btn-info'>
          Submit
        </button>
        <br />
        <a href='/signupuser'>Don't have an Account</a>
        <br />
        <br />
        <Link to='/' className='guidetobackpage'>
          Go back to Landing Page
        </Link>
      </div>
    </form>
  </section>
  <p
    className='Lorem-Ipsum'
    style={{ flex: '1', marginLeft: '2rem', textAlign: 'justify' }}
  >
  <h1 style={{fontWeight:'bolder', fontStyle:"normal", textAlign:"center"}}>RentMyRide</h1><br /><br />
RentMyRide is an innovative car rental application that allows users to rent a car based on half-day pay. With this app, you can quickly and easily rent a car for a few hours or a day, depending on your needs. Whether you need to run errands, attend an event, or simply explore the city, RentMyRide has got you covered. The app features a wide range of vehicles to choose from, including sedans, SUVs, and luxury cars. You can browse through the available options, choose the one that suits your needs, and book it with just a few taps on your phone. The app is user-friendly, secure, and reliable, ensuring that you have a seamless car rental experience. So why wait? Login to RentMyRide today and hit the road in style!
  </p>
</section>

    <ToastContainer />
    {/* <ContactUs /> */}

    </>
  )
}

export default LoginUser