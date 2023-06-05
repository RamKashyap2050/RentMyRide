const asyncHandler = require("express-async-handler");
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Car = require("../models/CarModel");
const BookingModel = require("../models/BookingModel");

//Function that enables us to Signup
const registerUser = asyncHandler(async (req, res) => {
  const { user_name, email, password, phone } = req.body;
  const image = req.files.image;
  console.log(image, user_name, email, password, phone);

  if (!user_name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields!");
  }

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    user_name,
    email,
    phone,
    image: image,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Account not registered");
  }

  res.status(201).json({
    _id: user.id,
    user_name: user.user_name,
    email: user.email,
    image: user.image,
    phone: user.phone,
    token: await generateToken(user.id),
    message: "You are registered",
  });
});

//Function which enables User to Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const user = await Users.findOne({ email });

  if (user) {
    if (user.AccountStatus == true) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        res.status(200).json({
          _id: user.id,
          user_name: user.user_name,
          phone: user.phone,
          image: user.image,
          email: user.email,
          token: await generateToken(user.id),
        });
      } else {
        res.status(400);
        throw new Error("Incorrect password");
      }
    } else {
      res.status(401);
      throw new Error("User account is blocked");
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const getallcarsforuser = asyncHandler(async (req, res) => {
  const getAllcars = await Car.find();
  res.status(200).json(getAllcars);
});

const getallcarsforuserbasedonavailability = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;

  // Find all cars
  const allCars = await Car.find();

  // Get the list of blocked car IDs within the selected date range
  const blockedCarIds = await BookingModel.find({
    startDate: { $lte: new Date(endDate) },
    endDate: { $gte: new Date(startDate) },
    isPaid: true,
  }).distinct("car");

  // Filter the cars based on availability
  const availableCars = allCars.filter(
    (car) => !blockedCarIds.some((blockedCarId) => blockedCarId.equals(car._id))
  );
  if (availableCars) {
    console.log("Cars Found");
  } else {
    console.log("Cars Not Found");
  }
  res.status(200).json(availableCars);
});

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getallcarsforuser,
  getallcarsforuserbasedonavailability,
};
