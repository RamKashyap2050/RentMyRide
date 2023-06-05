const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Car'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays:{
    type: String,
    required: true
  },
  totalAmount: {
    type: String,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  isCancelled: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'Bookings',
  timestamp: true
});

module.exports = mongoose.model('BookingModel', bookingSchema);
