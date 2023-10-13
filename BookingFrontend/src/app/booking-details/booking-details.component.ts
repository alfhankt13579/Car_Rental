import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent {
  clientId: any = '';
  carId: any = '';
  clientBookingDetails: any = '';
  startDate: any = '';
  endDate: any = '';
  pickedCar: any = [];
  pickedCar2: any = [];
  pickedCars: any = [];
  bookingDetails: any = '';
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.clientId = params.get('clientId');
      console.log(this.clientId);
    });

    this.api.clientBookingDetails(this.clientId).subscribe((result: any) => {
      console.log(result);
      this.clientBookingDetails = result.response;

      this.clientBookingDetails.sort((a: any, b: any) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });

      console.log(this.clientBookingDetails)

      for (let car of this.clientBookingDetails) {
        this.carId = car.carId;
        console.log(this.carId);

        const currentIndex = this.pickedCars.length;
        console.log(currentIndex)
        this.api.bookedCarDetails(this.carId).subscribe((car: any) => {
          console.log(car);
          car.response.index = currentIndex;
          this.pickedCars.push(car.response);
          this.sortPickedCars();
          console.log(this.pickedCars);
        });

        this.api.carId(this.carId).subscribe((car: any) => {
          console.log(car);
          car.response.index = currentIndex;
          this.pickedCars.push(car.response);
          this.sortPickedCars();
          console.log(this.pickedCars);
        });
      }
    });
  }

  sortPickedCars() {
    this.pickedCars.sort((a: any, b: any) => {
      return a.index - b.index;
    });
  }
}
