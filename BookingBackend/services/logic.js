const { response } = require("express");
const db = require("./db");

const register = (userName, mobileNumber, password) => {
  return db.Client.findOne({ mobileNumber }).then((response) => {
    if (response) {
      return {
        statusCode: 401,
        message: "Mobile Number already exists",
      };
    } else {
      let maxClientId = 0;
      return db.Client.find()
        .sort({ clientId: -1 })
        .limit(1)
        .then((maxClient) => {
          if (maxClient.length > 0) {
            maxClientId = maxClient[0].clientId;
          }
          const newClientId = maxClientId + 1;

          const newClient = new db.Client({
            clientId: newClientId,
            userName,
            mobileNumber,
            password,
          });

          return newClient.save().then(() => {
            return {
              statusCode: 200,
              message: "Registration Successful",
              clientId: newClientId,
            };
          });
        });
    }
  });
};

const login = (mobileNumber, password) => {
  return db.Client.findOne({ mobileNumber, password }).then((response) => {
    console.log(response);
    if (response) {
      return {
        statusCode: 200,
        message: "Login Successful",
        response,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid Login",
      };
    }
  });
};

const carList = () => {
  return db.Car.find({}).then((response) => {
    if (response.length > 0) {
      return {
        statusCode: 200,
        message: "Cars found",
        response,
      };
    } else {
      return {
        statusCode: 401,
        message: "No Cars found",
      };
    }
  });
};

const carIdFind = (carId) => {
  return db.Car.findOne({ carId }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "Car found",
        response,
      };
    } else {
      return {
        statusCode: 404,
        message: "Car not found",
      };
    }
  });
};

const carTypeFind = (carType) => {
  return db.Car.find({ carType }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "Car found",
        response,
      };
    } else {
      return {
        statusCode: 404,
        message: "Car not found",
      };
    }
  });
};

const book = (
  carId,
  clientId,
  location,
  state,
  district,
  startDate,
  endDate,
  rent
) => {
  return db.Car.findOne({ carId }).then((response) => {
    if (response) {
      const newBooking = new db.Booking({
        carId,
        clientId,
        location,
        state,
        district,
        startDate,
        endDate,
        rent,
      });
      return newBooking.save().then(() => {
        return {
          statusCode: 200,
          message: "Booking successful",
          response,
        };
      });
    } else {
      return {
        statusCode: 404,
        message: "Car not found",
      };
    }
  });
};

const booked = (carId, startDate, endDate) => {
  return db.Car.findOne({ carId: carId }).then((selectedCar) => {
    if (selectedCar) {
      const bookedCar = new db.CarBooked({
        ...selectedCar.toObject(),
        startDate,
        endDate,
      });
      return bookedCar.save().then(() => {
        return db.Car.deleteOne({ carId: carId }).then(() => {
          return {
            statusCode: 200,
            message: "Booking confirmed",
            selectedCar,
          };
        });
      });
    } else {
      return {
        statusCode: 404,
        message: "Car not found",
      };
    }
  });
};

const carBooked = (carId) => {
  return db.CarBooked.findOne({ carId }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "Booked car Details",
        response,
      };
    } else {
      return {
        statusCode: 404,
        message: "Details not found",
      };
    }
  });
};

const clientBookingDetails = (clientId) => {
  return db.Booking.find({ clientId }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "Booking Details",
        response,
      };
    } else {
      return {
        statusCode: 404,
        message: "Details not found",
      };
    }
  });
};

const bookingDetails = (carId, startDate) => {
  return db.Booking.findOne({ carId, startDate }).then((response) => {
    if (response) {
      return {
        statusCode: 200,
        message: "Booking Details",
        response,
      };
    } else {
      return {
        statusCode: 404,
        message: "Details not found",
      };
    }
  });
};

module.exports = {
  register,
  login,
  carList,
  carIdFind,
  carTypeFind,
  book,
  booked,
  carBooked,
  clientBookingDetails,
  bookingDetails,
};
