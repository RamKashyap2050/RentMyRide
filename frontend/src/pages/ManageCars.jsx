import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../styles/AllUserAdmin.css";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

const ManageCars = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { Admin } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3004/Users/getcars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    console.log("useEffect triggered with user:", Admin);
    if (!Admin) {
      navigate("/loginadmin");
    }
  }, [Admin, navigate]);

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  };

  const handleRemoveCar = async (carId) => {
    try {
      // Make an API call to remove the car with the given carId
      await axios.delete(`http://localhost:3004/Admin/cars/${carId}`);
      // Update the cars state after removing the car
      setCars(cars.filter((car) => car.id !== carId));
      toast.success("Car removed successfully.");
    } catch (error) {
      console.error("Error removing car:", error);
      toast.error("Error removing car.");
    }
  };

  return (
    <div>
      <AdminHeader />
      <h1 style={{ marginBottom: "2rem", textAlign: "center" }}>Manage Cars</h1>
      <div className="card-container" style={{ margin: "auto" }}>
        {cars.map((car) => (
          <div
            className="card  mb-3 w-50"
            style={{ margin: "auto", padding: "2rem" }}
            key={car.id}
          >
            <div className="card-image">
              <img
                src={convertImageBufferToBase64(car.image.data)}
                alt="Car Image"
                className="managecarbooking"
              />
            </div>
            <div className="card-content">
              <h3>{car.carName}</h3>
              <p>Model: {car.carModel}</p>
              <p>Rent Per Day: {car.rentPerDay}</p>
              <p>Type: {car.carType}</p>

              <button
                className="remove-button btn btn-danger"
                onClick={() => handleRemoveCar(car._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ManageCars;
