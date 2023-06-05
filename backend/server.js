const express = require('express')
const path = require('path')
// console.log(express)
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const adminModal = require('./models/AdminModel')
const userModel = require('./models/UserModel')
const cars = require('./models/CarModel')
const booking = require('./models/BookingModel')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
PORT = process.env.PORT || 5001
connectDB()


const app = express()
app.use(fileupload())
app.use(cors())
app.use(express.json())
// app.use(methodOverride('_method'))



// app.use(express.urlencoded({extended : true}))
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/Users', require('./routes/UserRoutes'))
app.use('/Admin', require('./routes/AdminRoutes'))


app.use(errorHandler)
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
