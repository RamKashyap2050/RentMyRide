import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Card, Badge } from "react-bootstrap";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
const ManageUserBookings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/Admin/getbookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the data in state
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  }, []);
  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div>
      <AdminHeader /><br /><br />
      <h3 style={{fontWeight:"bold", marginBottom:"2rem", textAlign:"center"}}>Manage User Bookings</h3>
      {data
        .filter((item) => item.isPaid) // Filter out items where isPaid is false
        .map((item) => (
          <Card key={item._id} className="mx-auto mb-3 w-75 p-3">
            <div style={{ display: "flex" }}>
              <div className="mr-3">
                <img
                  src={item.car.image}
                  alt="User Profile"
                  className="manageuserbooking"
                />
              </div>
              <div>
                <h5>{item.user.user_name}</h5>
                <p>{item.user.email}</p>
              </div>
            </div>
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <h6>Car Name: {item.car.carName}</h6>
                  <p>Car Type: {item.car.carType}</p>
                  {/* Include additional details */}
                  <p>Total Amount: {item.totalAmount}</p>
                  <p>
                    Start Date: {new Date(item.startDate).toLocaleDateString()}
                  </p>
                  <p>End Date: {new Date(item.endDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <img
                    src={convertImageBufferToBase64(item.car.image.data)}
                    alt="User Profile"
                    className="managecarbooking"
                  />
                </div>
              </div>
            <div>
              <button className="btn btn-danger">Cancel Booking</button>
            </div>
          </Card>
        ))}

      <Footer />
    </div>
  );
};

export default ManageUserBookings;
