const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    carName: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "Car", timestamp: true }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
