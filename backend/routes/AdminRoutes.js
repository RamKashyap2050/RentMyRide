const express = require("express")
const router = express.Router()
const {loginAdmin, addcar, getallusers, getallBookings, removeCars} = require('../controllers/AdminController')
const { blockbyadmin, unblockbyadmin } = require("../controllers/UserController")

router.route('/login/').post(loginAdmin)
router.route('/addacar').post(addcar)
router.route('/getallUsers').get(getallusers)
router.route('/getbookings').get(getallBookings)
router.route('/cars/:carid').delete(removeCars)
router.route('/updatetofalse/:id').put(blockbyadmin)
router.route('/updatetotrue/:id').put(unblockbyadmin)
module.exports = router