const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/Rental");

const Client = mongoose.model("Client", {
  clientId: Number,
  userName: String,
  mobileNumber: Number,
  password: String,
});

const Car = mongoose.model("Car", {
  carId: Number,
  carImage: String,
  carName: String,
  carType: String,
  carSeats: String,
  fuelType: String,
  price: Number,
  rentPerDay: Number,
});

const Booking = mongoose.model("Booking", {
  carId: Number,
  clientId: Number,
  location: String,
  state: String,
  district: String,
  startDate: String,
  endDate: String,
  rent: String,
});

const CarBooked = mongoose.model("CarBooked", {
  carId: Number,
  carImage: String,
  carName: String,
  carType: String,
  carSeats: String,
  fuelType: String,
  price: Number,
  rentPerDay: Number,
  startDate: Date,
  endDate: Date,
});

module.exports = { Client, Car, Booking, CarBooked };
