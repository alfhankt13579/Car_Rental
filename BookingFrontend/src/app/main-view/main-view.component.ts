import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  userName: any;
  clientId: any = '';
  minDate: string = '';
  maxDate: string = '';
  startDate: string = '';
  endDate: string = '';
  successMessage: string = '';
  errorMessage1: string = '';
  errorMessage2: string = '';
  selectedCarType: any = '';
  logoutSuccess: boolean = false;
  carType: any = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.clientId = sessionStorage.getItem('clientId');
    this.userName = sessionStorage.getItem('userName');

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

  searchCar() {
    if (!this.clientId) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else if (!this.startDate || !this.endDate) {
      this.errorMessage1 = 'Both Start Date and End Date are Required.';
      setTimeout(() => {
        this.errorMessage1 = '';
      }, 6000);
    } else if (this.startDate >= this.endDate) {
      this.errorMessage2 = 'Start Date should be less than End Date.';
      setTimeout(() => {
        this.errorMessage2 = '';
      }, 6000);
    } else {
      sessionStorage.setItem('startDate', this.startDate);
      sessionStorage.setItem('endDate', this.endDate);
      this.successMessage = 'Finding Cars';
      setTimeout(() => {
        this.router.navigateByUrl('car list');
      }, 3000);
    }
  }

  selectCarType(carType: any) {
    if (!this.clientId) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else {
      this.selectedCarType = carType;
      console.log(this.selectedCarType);
      this.router.navigateByUrl(`/car type/${this.selectedCarType}`);
    }
  }

  clientBookingDetails() {
    if (!this.clientId) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    } else {
      this.clientId = sessionStorage.getItem('clientId');
      console.log(this.clientId);
      this.router.navigateByUrl(`booking details/${this.clientId}`);
      this.api.clientBookingDetails(this.clientId).subscribe((result: any) => {
        console.log(result);
      });
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
