import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
// import ContactUs from '../components/ContactUs'
function SignupforUser() {
  //Add formData using
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    image: "",
  });

  const { user_name, email, password, password2, phone, image } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/user");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = new FormData();
      userData.append("user_name", user_name);
      userData.append("email", email);
      userData.append("password", password);
      userData.append("phone", phone);
      userData.append("image", image);
      console.log(userData);
      dispatch(register(userData));
    }
  };

  return (
    <>
      <div className="register" style={{ width:"400px", margin: "auto" }}>
        <section
          className="heading"
          style={{ margin: "auto", textAlign: "center" }}
        >
          <h1>Signup User</h1>
        </section>
        <br />
        <br />
        <span class="line"></span>
        <br />
        <br />

        <div>
        <div>
        <section>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="user_name"
                value={user_name}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                placeholder="Choose a Picture for Profile Photo"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block btn-info">
                Submit
              </button>
              <br />
              <a href="/loginuser">Do you already have an Account</a>
            </div>
          </form>
        </section>
        </div>
        <div>
          <p
            className="Lorem-Ipsum"
            style={{ flex: "1", marginLeft: "2rem", textAlign: "justify" }}
          >
            <h1
              style={{
                fontWeight: "bolder",
                fontStyle: "normal",
                textAlign: "center",
              }}
            >
              RentMyRide
            </h1>
            <br />
            <br />
            RentMyRide is an innovative car rental application that allows users
            to rent a car based on half-day pay. With this app, you can quickly
            and easily rent a car for a few hours or a day, depending on your
            needs. Whether you need to run errands, attend an event, or simply
            explore the city, RentMyRide has got you covered. The app features a
            wide range of vehicles to choose from, including sedans, SUVs, and
            luxury cars. You can browse through the available options, choose
            the one that suits your needs, and book it with just a few taps on
            your phone. The app is user-friendly, secure, and reliable, ensuring
            that you have a seamless car rental experience. So why wait? Login
            to RentMyRide today and hit the road in style!
          </p>
        </div>
        </div>
      </div>
      {/* <ContactUs /> */}
    </>
  );
}

export default SignupforUser;
