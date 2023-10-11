import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../styles/AllUserAdmin.css";
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const { Admin } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", Admin);
    if (!Admin) {
      navigate("/loginadmin");
    }
  }, [Admin, navigate]);

  //This will fetch all users for Admin for Blocking and Unblocking Purposes
  useEffect(() => {
    Axios.get("/Admin/getallUsers").then((response) => {
      setResults(response.data);
      console.log(response.data);
    });
  }, []);

  //This will block a user
  const blockUser = (key) => {
    Axios.put(`/Admin/updatetofalse/${key}`).then(() => {
      // Update the state to reflect the new status
      setResults((prevResults) =>
        prevResults.map((val) => {
          if (val._id === key) {
            return {
              ...val,
              AccountStatus: false,
            };
          }
          return val;
        })
      );
      toast.success("Blocked successfully");
    });
  };

  //This will unblock a user
  const unblockUser = (key) => {
    Axios.put(`/Admin/updatetotrue/${key}`).then(() => {
      // Update the state to reflect the new status
      setResults((prevResults) =>
        prevResults.map((val) => {
          if (val._id === key) {
            return {
              ...val,
              AccountStatus: true,
            };
          }
          return val;
        })
      );
      toast.success("Unblocked successfully");
    });
  };

  const imageUrls = results.map((user) => {
    const imageBuffer = user?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });

  return (
    <>
      <AdminHeader />
      <div className="results">
        <h1 className="brand">List of Users</h1>
        Total Users {results.length} :-
        <div>
          <table>
            <thead>
              <tr>
                <th>Profile Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((val, key) => (
                <tr key={key}>
                  <td>
                    {" "}
                    <img
                      className="Dashboardprofilephoto"
                      src={val.image}
                      alt="User profile"
                    />
                  </td>
                  <td>{val.user_name}</td>
                  <td>{val.email}</td>
                  <td>{val.phone}</td>
                  <td>
                    {val.AccountStatus ? (
                      <button
                        className="btn-danger"
                        onClick={() => {
                          blockUser(val._id);
                        }}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="btn-primary"
                        onClick={() => {
                          unblockUser(val._id);
                        }}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageUsers;
