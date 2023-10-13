import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
})
export class BookedComponent implements OnInit {
  clientId: any = '';
  carId: any = '';
  startDate: any = '';
  endDate: any = '';
  pickedCar: any = '';
  bookingDetails: any = '';
  logoutSuccess: boolean = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientId = sessionStorage.getItem('clientId');
    if (!this.clientId) {
      alert('Please login');
      this.router.navigateByUrl('/login');
    }

    this.clientId = sessionStorage.getItem('clientId');
    this.route.paramMap.subscribe((params: any) => {
      this.carId = params.get('carId');
      console.log(this.carId);

      this.startDate = sessionStorage.getItem('startDate');
      this.endDate = sessionStorage.getItem('endDate');

      this.api.bookedCarDetails(this.carId).subscribe((car: any) => {
        console.log(car);
        this.pickedCar = car.response;
      });

      if (!this.pickedCar) {
        this.api.carId(this.carId).subscribe((car: any) => {
          console.log(car);
          this.pickedCar = car.response;
        });
      }

      this.api
        .bookingDetails(this.carId, this.startDate)
        .subscribe((details: any) => {
          console.log(details);
          this.bookingDetails = details.response;
        });
    });
  }

  clientBookingDetails() {
    this.clientId = sessionStorage.getItem('clientId');
    console.log(this.clientId);
    this.router.navigateByUrl(`booking details/${this.clientId}`);
    this.api.clientBookingDetails(this.clientId).subscribe((result: any) => {
      console.log(result);
    });
  }

  logout() {
    this.logoutSuccess = true;
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }
}
