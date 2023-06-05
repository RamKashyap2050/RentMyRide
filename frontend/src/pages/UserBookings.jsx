import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import moment from "moment";

const UserBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user._id);
  const { token } = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/Users/getbookings/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log("Response Data", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data]);

  const removeBooking = async (booking) => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/Users/bookings/${booking}`
      );
      console.log(response.data); // Optional: Log the response data if needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const confirmBooking = async (booking) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/Users/confirmbookings/${booking}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelbooking = async (booking) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/Users/cancelbookings/${booking}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <UserHeader />
      <br />
      <h3
        className="mb-3"
        style={{ margin: "auto", textAlign: "center", fontWeight: "bold" }}
      >
        {user.user_name} Bookings
      </h3>
      {data.map((item, key) => (
        <div
          key={key}
          className={`card mb-3 mx-auto w-75 ml-3 ${
            item.isCancelled || new Date(item.endDate) <= new Date()
              ? "disabled-card"
              : ""
          }`}
        >
          <div
            className="card-body p-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h5 className="card-title" style={{ fontSmooth: "2em" }}>
                {item.car.carName}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {item.car.carModel}
              </h6>
              <p className="card-text">Type: {item.car.carType}</p>
              <p className="card-text">Rent per day: {item.car.rentPerDay}</p>
              <p className="card-text">
                Start Date:{" "}
                {moment
                  .utc(item.startDate)
                  .utcOffset("+00:00")
                  .format("YYYY-MM-DD")}
              </p>
              <p className="card-text">
                End Date:{" "}
                {moment
                  .utc(item.endDate)
                  .utcOffset("+00:00")
                  .format("YYYY-MM-DD")}
              </p>

              <p className="card-text" style={{ fontWeight: "bold" }}>
                Total Amount: {item.totalAmount}
              </p>
              <p className="card-text">Total Days: {item.totalDays}</p>
              <p style={{ fontWeight: "bold" }}>
                Booking Status:{" "}
                {item.isPaid && !item.isCancelled ? (
                  <Badge bg="success" text="light">
                    Confirmed
                  </Badge>
                ) : item.isPaid && item.isCancelled ? (
                  <Badge bg="danger" text="light">
                    Cancelled
                  </Badge>
                ) : (
                  <Badge bg="warning">Pending</Badge>
                )}
                {console.log(item.isPaid, item.isCancelled)}
              </p>
              <br />
              {item.isPaid && !item.isCancelled ? (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    cancelbooking(item._id);
                  }}
                >
                  Cancel Booking
                </button>
              ) : item.isPaid && item.isCancelled ? (
                <span></span>
              ) : (
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmBooking(item._id)}
                  >
                    Pay Now
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeBooking(item._id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div>
              <img
                src={convertImageBufferToBase64(item.car.image.data)}
                alt="User Profile"
                className="managecarbooking"
              />
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default UserBookings;
