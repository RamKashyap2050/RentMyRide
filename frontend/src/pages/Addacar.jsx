import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { FaCar } from 'react-icons/fa';
import axios from 'axios';



const Addacar = () => {
    const navigate = useNavigate()
    const { Admin } = useSelector((state) => state.auth) 
    useEffect(() => {
        console.log('useEffect triggered with user:', Admin)
        if (!Admin){
          navigate('/loginadmin')
        }
      },[Admin,navigate])
  
  const [carData, setCarData] = useState({
    carName: '',
    carModel: '',
    carType: '',
    image: '',
    rentPerHalfDay: '',
  });

  const { carName, carModel, carType, image, rentPerHalfDay } = carData;
  const onChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setCarData((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setCarData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('carName', carData.carName);
    formData.append('carModel', carData.carModel);
    formData.append('carType', carData.carType);
    formData.append('image', carData.image);
    formData.append('rentPerHalfDay', carData.rentPerHalfDay);
    console.log(formData)
    axios.post('http://localhost:3004/Admin/addacar', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  return (
   <>
    <AdminHeader /><br /><br />
    <div className='add-car' style={{maxWidth:"400px", margin:"auto"}}>
      <h2 style={{textAlign:"center"}}>Add a Car <FaCar /></h2>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='carName'
            name='carName'
            value={carName}
            placeholder='Enter car name'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='carModel'
            name='carModel'
            value={carModel}
            placeholder='Enter car model'
            onChange={onChange}
          />
        </div>
        <div >
          <select id="carType" name="carType" value={carType} onChange={onChange} style={{width:"100%", padding:"0.25rem"}}>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Sports">Sports</option>
            <option value="RV">RV</option>

          </select>
        </div><br />
        <div className='form-group'>
          <input
            type='file'
            className='form-control'
            id='image'
            name='image'
            placeholder='Choose an image for car'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='rentPerHalfDay'
            name='rentPerHalfDay'
            value={rentPerHalfDay}
            placeholder='Enter rent per half day'
            onChange={onChange}
          />
        </div>
        <button type='submit' className='btn btn-info btn-block'>
          Submit
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Addacar;
