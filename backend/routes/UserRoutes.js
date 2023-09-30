const express = require("express")
const router = express.Router()
const {registerUser, loginUser, getallcarsforuser, getallcarsforuserbasedonavailability} = require("../controllers/UserController")
const {  AddCarToBookingModel, getBookings, removeBooking, confirmbooking, cancelbooking} = require("../controllers/BookingController")
const protect = require('../middlewares/protect')
const { removeCars } = require("../controllers/AdminController")

router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/getcars').get(getallcarsforuser)
router.route('/addtomodel').post(AddCarToBookingModel)
router.route('/getbookings/:userId').get(protect, getBookings)
router.route('/bookings/:booking').delete(removeBooking)
router.route('/availability').post(getallcarsforuserbasedonavailability)
router.route('/confirmbookings/:booking').put(confirmbooking)
router.route('/cancelbookings/:booking').put(cancelbooking)



module.exports = router