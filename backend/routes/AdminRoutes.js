const express = require("express")
const router = express.Router()
const {loginAdmin, addcar, getallusers, getallBookings, removeCars} = require('../controllers/AdminController')

router.route('/login/').post(loginAdmin)
router.route('/addacar').post(addcar)
router.route('/getallUsers').get(getallusers)
router.route('/getbookings').get(getallBookings)
router.route('/cars/:carid').delete(removeCars)
module.exports = router