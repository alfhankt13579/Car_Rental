import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  register(userName: any, mobileNumber: any, password: any) {
    const body = {
      userName,
      mobileNumber,
      password,
    };
    return this.http.post('http://localhost:5000/register', body);
  }

  login(mobileNumber: any, password: any) {
    const body = {
      mobileNumber,
      password,
    };
    return this.http.post('http://localhost:5000/login', body);
  }

  carList() {
    return this.http.get('http://localhost:5000/carList');
  }

  carId(carId: any) {
    return this.http.get(`http://localhost:5000/carId/${carId}`);
  }

  carType(carType: any) {
    return this.http.get(`http://localhost:5000/carType/${carType}`);
  }

  booking(
    carId: any,
    clientId: any,
    state: any,
    district: any,
    location: any,
    startDate: any,
    endDate: any,
    rent: any
  ) {
    const body = {
      carId,
      clientId,
      state,
      district,
      location,
      startDate,
      endDate,
      rent,
    };
    return this.http.post('http://localhost:5000/booking', body);
  }

  bookedCarDetails(carId: any) {
    return this.http.get(`http://localhost:5000/carBooked/${carId}`);
  }

  clientBookingDetails(clientId: any) {
    return this.http.get(
      `http://localhost:5000/clientBookingDetails/${clientId}`
    );
  }

  bookingDetails(carId: any, startDate: any) {
    return this.http.get(
      `http://localhost:5000/bookingDetails/${carId}/${startDate}`
    );
  }

  booked(carId: any, startDate: any, endDate: any) {
    const body = {
      startDate,
      endDate,
    };
    return this.http.post(`http://localhost:5000/booked/${carId}`, body);
  }
}
