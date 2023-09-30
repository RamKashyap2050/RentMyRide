const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const Car = require("../models/CarModel");
const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const sharp = require("sharp"); // Import the sharp library

//Function which enables User to Login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin.id,
      user_name: admin.admin_name,
      phone: admin.phone,
      email: admin.email,
      token: await generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Admin credentails");
  }
});
const addcar = asyncHandler(async (req, res) => {
    const { carName, carModel, carType, rentPerHalfDay } = req.body;
    const image = req.files.image;
    console.log(carName, carModel, carType, rentPerHalfDay);
  
    if (!carName || !carModel || !carType || !image || !rentPerHalfDay) {
      res.status(400).json({ message: "Please enter all fields" });
      return; // Exit the function early if validation fails
    }
  
    try {
      // Use Sharp to compress the image to less than 750KB
      const compressedImage = await sharp(image.data)
        .resize({ width: 800 })
        .jpeg({ quality: 80 })
        .toBuffer();
  
      // Check the size of the compressed image
      const compressedImageSizeInBytes = compressedImage.length;
      const compressedImageSizeInKB = compressedImageSizeInBytes / 1024;
  
      if (compressedImageSizeInKB > 750) {
        res.status(400).json({ message: "Compressed image size should be less than 750KB" });
        return;
      }
  
      // Create the car document with the compressed image
      const car = await Car.create({
        carName,
        carModel,
        carType,
        image: {
          data: compressedImage, // Store the compressed image data
          ContentType: image.ContentType, // Preserve the content type
        },
        rentPerDay: rentPerHalfDay,
      });
  
      if (!car) {
        res.status(500).json({ message: "Car couldn't be stored in the DB" });
        return; // Exit the function if car creation fails
      }
  
      res.status(200).json({
        _id: car.id,
        carName: car.carName,
        carModel: car.carModel,
        carType: car.carType,
        image: car.image, // Return the custom image structure
        rentPerHalfDay: car.rentPerDay, // You mentioned rentPerDay here, so I'm assuming it's equivalent to rentPerHalfDay
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

const getallusers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

const getallBookings = asyncHandler(async (req, res) => {
  const getallBookings = await Booking.find({})
    .populate("user", "user_name email phone image")
    .populate("car", "carName image carModel carType rentPerDay");
  res.status(200).json(getallBookings);
  console.log(getallBookings);
});

const removeCars = asyncHandler(async (req, res) => {
  const { carid } = req.params;
  const removeCar = await Car.deleteOne({ _id: carid });
  res.status(200).json({ message: "Deleted Succesfully" });
});

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginAdmin,
  addcar,
  getallusers,
  getallBookings,
  removeCars,
};
