const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/AdminModel') 
const Car = require('../models/CarModel')
const User = require('../models/UserModel')
const Booking = require("../models/BookingModel")
//Function which enables User to Login
const loginAdmin = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        res.status(400)
        throw new Error("Please enter all the fields")
    }

    const admin = await Admin.findOne({email})
    if(admin && await bcrypt.compare(password, admin.password)){
        res.status(200).json({
            _id: admin.id,
            user_name: admin.admin_name,
            phone: admin.phone,
            email: admin.email,
            token: await generateToken(admin.id)
        })
    }else{
        res.status(400)
        throw new Error("Incorrect Admin credentails")
    }
})

const addcar = asyncHandler(async(req,res) => {
    const {carName, carModel, carType, rentPerHalfDay } = req.body
    const image  = req.files.image
    if( !carName || !carModel || !carType || !image || !rentPerHalfDay){
        res.json({message:"Please enter all fields"})
    }

    // read the image data from the request and assign it to a variable

    const car = await Car.create({
        carName, 
        carModel, 
        carType, 
        image: image,
        rentPerHalfDay        
    })
    console.log(car)
    if(!car){
        res.json({message:"Car couldn't be stored on DB"})
    }

    res.status(200).json({
        _id: car.id,
        carName: car.carName,
        carModel: car.carModel,
        carType: car.carType,
        image: car.image,
        rentPerHalfDay: car.rentPerHalfDay

    })
})

const getallusers = asyncHandler(async(req,res) => {
    const user = await User.find({})
    res.status(200).json(user)
})

const getallBookings = asyncHandler(async(req,res) => {
    const getallBookings = await Booking.find({})
    .populate("user", "user_name email phone image")
    .populate("car", "carName image carModel carType rentPerDay")
    res.status(200).json(getallBookings)
    console.log(getallBookings)
})

const removeCars = asyncHandler(async (req, res) => {
    const { carid } = req.params;
    const removeCar = await Car.deleteOne({ _id: carid });
    res.status(200).json({ message: "Deleted Succesfully" });
  });

  
const generateToken = async(id) => {
    return await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {loginAdmin, addcar, getallusers, getallBookings, removeCars}