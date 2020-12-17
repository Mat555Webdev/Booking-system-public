//this file is going to determine the structure for
//the booking document that will be stored inside
//mongoDB
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  dates: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pending: {
    type: Boolean,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true
  },
  rejected: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Bookings", bookingSchema);
