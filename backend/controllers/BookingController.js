const asyncHandler = require("express-async-handler");
const Users = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Car = require("../models/CarModel");
const Booking = require("../models/BookingModel");

const AddCarToBookingModel = asyncHandler(async (req, res) => {
  try {
    const { user, car, startDate, endDate, totalAmount, totalDays } = req.body;
    console.log(user, car, startDate, endDate, totalAmount, totalDays);

    if (!user || !car || !startDate || !endDate) {
      return res.status(422).json({ message: "Please enter all fields" });
    }

    const booking = await Booking.create({
      user,
      car,
      startDate,
      endDate,
      totalDays,
      totalAmount,
    });
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const getBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })
      .populate("car", "carName carModel carType rentPerDay image")
      .select("user car startDate endDate totalAmount totalDays isPaid isCancelled");
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving bookings" });
  }
};

const removeBooking = asyncHandler(async (req, res) => {
  const { booking } = req.params;
  const removeBooking = await Booking.deleteOne({ _id: booking });
  res.status(200).json({ message: "Deleted Succesfully" });
});

const confirmbooking = asyncHandler(async (req, res) => {
  const { booking } = req.params;

  const updatedBooking = await Booking.findByIdAndUpdate(
    booking,
    { isPaid: true },
    { new: true } 
  );

  if (updatedBooking) {
    res.status(200).json({ message: "Booking confirmed successfully" });
  } else {
    res.status(404).json({ error: "Booking not found" });
  }
});

const cancelbooking = asyncHandler(async (req, res) => {
  const { booking } = req.params;

  const updatedBooking = await Booking.findByIdAndUpdate(
    booking,
    { isCancelled: true },
    { new: true } 
  );

  if (updatedBooking) {
    res.status(200).json({ message: "Booking confirmed successfully" });
  } else {
    res.status(404).json({ error: "Booking not found" });
  }
});

module.exports = {
  AddCarToBookingModel,
  getBookings,
  removeBooking,
  confirmbooking,
  cancelbooking,
};
