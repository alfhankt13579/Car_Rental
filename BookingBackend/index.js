const express = require("express");

const cors = require("cors");

const db = require("./services/db");

const logic = require("./services/logic");

const cron = require("node-cron");

const server = express();

server.use(
  cors({
    origin: "http://localhost:4200",
  })
);

server.use(express.json());

server.listen(5000, () => {
  console.log("server listening on port 5000");
});

server.post("/register", (req, res) => {
  console.log("inside register API call");
  console.log(req.body);
  logic
    .register(req.body.userName, req.body.mobileNumber, req.body.password)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

server.post("/login", (req, res) => {
  console.log("inside login API call");
  console.log(req.body);
  logic.login(req.body.mobileNumber, req.body.password).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

server.get("/carList", (req, res) => {
  console.log("inside carList API call");
  logic.carList().then((response) => {
    res.status(response.statusCode).json(response);
  });
});

server.get("/carId/:carId", (req, res) => {
  console.log("inside carId API call");
  logic.carIdFind(req.params.carId).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

server.get("/carType/:carType", (req, res) => {
  console.log("inside carType API call");
  logic.carTypeFind(req.params.carType).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

server.post("/booking", (req, res) => {
  console.log("inside book API call");
  console.log(req.body);
  logic
    .book(
      req.body.carId,
      req.body.clientId,
      req.body.location,
      req.body.state,
      req.body.district,
      req.body.startDate,
      req.body.endDate,
      req.body.rent
    )
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

server.get("/carBooked/:carId", (req, res) => {
  console.log("inside CarBooked Details API call");
  logic.carBooked(req.params.carId).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

server.post("/booked/:carId", (req, res) => {
  console.log("inside carbooked API call");
  console.log(req.params);
  logic
    .booked(req.params.carId, req.body.startDate, req.body.endDate)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

server.get("/clientBookingDetails/:clientId", (req, res) => {
  console.log("inside Booking Details API call");
  logic
    .clientBookingDetails(req.params.clientId)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

server.get("/bookingDetails/:carId/:startDate", (req, res) => {
  console.log("inside Booking Details API call");
  logic
    .bookingDetails(req.params.carId, req.params.startDate)
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

cron.schedule("0 * * * *", async () => {
  console.log("Cron job started at", new Date());
  const currentDate = new Date();
  const carsToReturn = await db.CarBooked.find({
    endDate: { $lte: currentDate },
  });
  console.log("Found cars to return:", carsToReturn);
  for (const car of carsToReturn) {
    const newCar = new db.Car({
      carId: car.carId,
      carImage:car.carImage,
      carName: car.carName,
      carType: car.carType,
      carSeats: car.carSeats,
      fuelType: car.fuelType,
      price: car.price,
    });
    await newCar.save();
    await db.CarBooked.deleteOne({ carId: car.carId });
  }
  console.log(`Returned ${carsToReturn.length} cars to carlist.`);
});
