import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-type-list',
  templateUrl: './car-type-list.component.html',
  styleUrls: ['./car-type-list.component.css'],
})
export class CarTypeListComponent implements OnInit {
  clientId: any = '';
  carType: any = '';
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
  filteredCars: any = '';
  selectedFilter: any = '';
  selectedValue: any = '';
  logoutSuccess: boolean= false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((result: any) => {
      console.log(result);
      this.carType = result.carType;
      this.api.carType(this.carType).subscribe((data: any) => {
        console.log(data);
        this.cars = data.response;
        console.log(this.cars);
        // this.filteredCars = this.cars;
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
