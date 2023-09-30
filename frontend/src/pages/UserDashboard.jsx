import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserHeader from "../components/UserHeader";
import axios from "axios";

import Footer from "../components/Footer";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { Alert } from "react-bootstrap";
const { RangePicker } = DatePicker;

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3004/Users/getcars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const fetchAvailableCars = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3004/Users/availability",
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      const data = response.data;
      setCars(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchAvailableCars();
      setSearchClicked(true);
    }
  };
  const imageUrls = cars.map((car) => {
    const imageBuffer = car?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });

  console.log(startDate, endDate);

  const filterbydates = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      const startDateValue = dates[0].format("YYYY-MM-DD");
      const endDateValue = dates[1].format("YYYY-MM-DD");
      setStartDate(startDateValue);
      setEndDate(endDateValue);
      console.log(startDateValue);
      console.log(endDateValue);
    } else {
      console.log("No valid dates selected");
    }
  };

  const handleRentNow = async (carIndex) => {
    if (!searchClicked) {
      console.log("Please click the search button first.");
      setShow(true);
      return;
    }
    const selectedCar = cars[carIndex];
    const carId = selectedCar._id;
    const userId = user._id;
    const startMoment = moment(startDate, "YYYY-MM-DD");
    const endMoment = moment(endDate, "YYYY-MM-DD");
    const totalDays = endMoment.diff(startMoment, "days");
    const totalAmount = totalDays * selectedCar.rentPerDay;
    console.log(
      "Frontend: ",
      userId,
      carId,
      startDate,
      endDate,
      totalDays,
      totalAmount
    );

    try {
      await axios.post("http://localhost:3004/Users/addtomodel", {
        car: carId,
        user: userId,
        startDate: startDate,
        endDate: endDate,
        totalDays: totalDays,
        totalAmount: totalAmount,
      });
      navigate("/user/bookings");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
    console.log(selectedCarType);
  };

  const filteredCars = cars.filter((car) => {
    if (selectedCarType === "") {
      return true; // Return all cars if no car type is selected
    }
    return car.carType === selectedCarType;
  });

  return (
    <div>
      <UserHeader />
      <div className="container text-center mt-4">
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <RangePicker
              format="YYYY-MM-DD"
              onChange={filterbydates}
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
            <button className="btn btn-primary ml-2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      {show ? (
        <Alert variant="danger" className="w-50 mx-auto">
          Please Click Search Button near Calendar
        </Alert>
      ) : null}

      <div
        className="container"
        style={{
          display: "grid",
          justifyContent: "space-evenly",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {cars.map((car, key) => (
          <div
            className="card"
            key={key}
            style={{ maxWidth: "400px", marginBottom: "1rem" }}
          >
            {imageUrls.map((imageUrl, index) =>
              index === key ? (
                <img
                  className="card-img-top Dashboardcar"
                  src={imageUrl}
                  alt="Car"
                />
              ) : null
            )}
            <div className="card-body">
              <h5 className="card-title">{car.carName}</h5>
              <p className="card-text">Model Year: {car.carModel}</p>
              <p className="card-text font-weight-bold">
                Car Type: {car.carType}
              </p>
              <p className="card-text font-weight-light">
                Amount: {car.rentPerDay}
              </p>
              {startDate && endDate ? (
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    console.log("Selected Start Date:", startDate);
                    console.log("Selected End Date:", endDate);
                    handleRentNow(key);
                  }}
                >
                  Rent Now
                </button>
              ) : (
                <button className="btn btn-primary btn-block">
                  Select Dates
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
