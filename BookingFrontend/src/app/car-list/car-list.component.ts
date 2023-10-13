import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  clientId: any;
  location: any = '';
  minDate: string = '';
  maxDate: string = '';
  startDate: any = '';
  endDate: any = '';
  cars: any = '';
  carId: any = '';
  errorMessage1 = '';
  errorMessage2 = '';
  selectedState: any = '';
  selectedDistrict: any = '';
  districts: any;
  filteredCars: any = '';
  selectedFilter: any = '';
  selectedValue: any = '';
  bookingSuccess: boolean = false;
  logoutSuccess: boolean = false;


  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {

    this.clientId = sessionStorage.getItem('clientId');
    if (!this.clientId) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month1 = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(currentDate.getDate()).padStart(2, '0');
    let nextDay = currentDate.getDate() + 1;
    let nextMonth = currentDate.getMonth() + 1;
    let nextYear = year;

    if (nextDay > new Date(year, nextMonth, 0).getDate()) {
      nextDay = 1;
      nextMonth += 1;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
    }
    const month2 = String(nextMonth).padStart(2, '0');
    const day2 = String(nextDay).padStart(2, '0');

    // console.log(currentDate);
    // console.log(year);
    // console.log(nextYear);
    // console.log(month1);
    // console.log(nextMonth);
    // console.log(month2);
    // console.log(day1);
    // console.log(nextDay);
    // console.log(day2);

    this.minDate = `${year}-${month1}-${day1}`;
    this.maxDate = `${nextYear}-${month2}-${day2}`;

    // console.log(this.minDate);
    // console.log(this.maxDate);

    this.startDate = sessionStorage.getItem('startDate');
    this.endDate = sessionStorage.getItem('endDate');

    this.api.carList().subscribe((data: any) => {
      console.log(data);
      this.cars = data.response;
      console.log(this.cars);
      this.filteredCars = this.cars;
    });
  }

  validateDateMin() {
    const inputDateObj = new Date(this.startDate);
    const minDateObj = new Date(this.minDate);

    if (inputDateObj < minDateObj) {
      this.startDate = this.minDate;
      // console.log(this.startDate);
    }
  }

  validateDateMax() {
    const inputDateObj = new Date(this.endDate);
    const maxDateObj = new Date(this.maxDate);

    if (inputDateObj < maxDateObj) {
      this.endDate = this.maxDate;
      // console.log(this.endDate);
    }
  }

  clientBookingDetails() {
    this.clientId = sessionStorage.getItem('clientId');
    console.log(this.clientId);
    this.router.navigateByUrl(`booking details/${this.clientId}`);
    this.api.clientBookingDetails(this.clientId).subscribe((result: any) => {
      console.log(result);
    });
  }

  filterCars(criteria: string, value: any) {
    this.selectedFilter = criteria;
    this.selectedValue = value;
    this.filteredCars = this.cars.filter((car: any) => {
      if (criteria === 'carSeats') {
        return car.carSeats === value;
      } else if (criteria === 'carType') {
        return car.carType === value;
      } else if (criteria === 'fuelType') {
        return car.fuelType === value;
      }
      return true;
    });
  }

  resetFilters() {
    this.filteredCars = this.cars;
    this.selectedFilter = null;
    this.selectedValue = null;
  }

  onStateChange() {
    if (this.selectedState === 'Kerala') {
      this.districts = [
        { name: 'Trivandrum' },
        { name: 'Kollam' },
        { name: 'Ernakulam' },
        { name: 'Kozhikode' },
      ];
      this.selectedDistrict = this.districts[0].name;
    } else {
      this.districts = [
        { name: 'Chennai' },
        { name: 'Coimbatore' },
        { name: 'Madurai' },
        { name: 'Trichy' },
      ];
      this.selectedDistrict = this.districts[0].name;
    }
  }

  selectCar(i: any) {
    this.carId = this.cars[i].carId;
    console.log(this.carId);
  }

  bookNow() {
    if (
      !this.selectedState ||
      !this.selectedDistrict ||
      !this.location ||
      !this.startDate ||
      !this.endDate
    ) {
      this.errorMessage1 = 'All Inputs are Required.';
      setTimeout(() => {
        this.errorMessage1 = '';
      }, 6000);
    } else if (this.startDate >= this.endDate) {
      this.errorMessage2 = 'Start Date should be less than End Date.';
      setTimeout(() => {
        this.errorMessage2 = '';
      }, 6000);
    } else {
      this.selectedState = sessionStorage.setItem(
        'selectedState',
        this.selectedState
      );
      this.selectedDistrict = sessionStorage.setItem(
        'selectedDistrict',
        this.selectedDistrict
      );
      this.location = sessionStorage.setItem('location', this.location);
      this.startDate = sessionStorage.setItem('startDate', this.startDate);
      this.endDate = sessionStorage.setItem('endDate', this.endDate);
      this.bookingSuccess = true;
      console.log(this.carId);
      setTimeout(() => {
        this.router.navigateByUrl(`/booking/${this.carId}`);
      }, 2500);
    }
  }

  logout() {
    this.logoutSuccess = true;
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }
}
