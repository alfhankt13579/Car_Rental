import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  clientId: any = '';
  selectedState: any = '';
  selectedDistrict: any = '';
  location: any = '';
  startDate: any = '';
  endDate: any = '';
  startDatePrice: any = '';
  endDatePrice: any = '';
  selectedCar: any = '';
  carId: any = '';
  price: any = '';
  rentPerDay: any = '';
  numberOfDays: any = '';
  rent: any = '';
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
    this.selectedState = sessionStorage.getItem('selectedState');
    this.selectedDistrict = sessionStorage.getItem('selectedDistrict');
    this.location = sessionStorage.getItem('location');
    this.startDate = sessionStorage.getItem('startDate');
    this.endDate = sessionStorage.getItem('endDate');

    // console.log(this.selectedState);
    // console.log(this.selectedDistrict);
    // console.log(this.location);
    // console.log(this.startDate);
    // console.log(this.endDate);

    this.startDatePrice = new Date(this.startDate);
    this.endDatePrice = new Date(this.endDate);
    this.numberOfDays = Math.ceil(
      (this.endDatePrice - this.startDatePrice) / (1000 * 60 * 60 * 24)
    );

    // console.log(this.startDate);
    // console.log(this.endDate);
    // console.log(this.numberOfDays);

    this.route.paramMap.subscribe((params: any) => {
      this.carId = params.get('carId');

      this.api.carId(this.carId).subscribe((car: any) => {
        // console.log(car);
        this.selectedCar = car.response;
        console.log(this.selectedCar);

        this.rentPerDay = this.selectedCar.rentPerDay;
        // console.log(this.rentPerDay);

        this.rent = this.rentPerDay * this.numberOfDays;
        console.log(this.rent);
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

  confirmBook() {
    this.api
      .booking(
        this.carId,
        this.clientId,
        this.selectedState,
        this.selectedDistrict,
        this.location,
        this.startDate,
        this.endDate,
        this.rent
      )
      .subscribe((response: any) => {
        console.log(response.message);
        alert(response.message);
        this.api
          .booked(this.carId, this.startDate, this.endDate)
          .subscribe((response: any) => {
            console.log(response);
          });
        this.router.navigateByUrl(`/booked/${this.carId}`);
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
