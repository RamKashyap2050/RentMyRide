import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import { Buffer } from "buffer";

const ProfilePageUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("useEffect triggered with user:", user);
    if (!user) {
      navigate("/loginuser");
    }
  }, [user, navigate]);
  const onLogout = () => {
    navigate("/loginuser");
    dispatch(logout());
    dispatch(reset());
  };

  const imageBuffer = user?.image?.data;
  if (!imageBuffer) {
    return null;
  }
  const base64String = Buffer.from(imageBuffer).toString("base64");
  const imageUrl = `data:image/jpeg;base64,${base64String}`;

  return (
    <div>
      <UserHeader />
      <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
        {imageUrl && (
          <img className="profilephoto" src={imageUrl} alt="User profile" />
        )}

        <div className="card-body">
          <h2 className="card-title" style={{ fontWeight: "lighter" }}>
            Name: {user?.user_name}
          </h2>
          <h5 className="card-text" style={{ fontWeight: "lighter" }}>
            Email: {user?.email}
          </h5>
          <h5 className="card-text" style={{ fontWeight: "lighter" }}>
            Phone: {user?.phone}
          </h5>
          <br />
          <br />
          <br />
          <button
            onClick={() => {
              onLogout();
            }}
            className="btn btn-block btn-danger"
          >
            Logout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePageUser;
