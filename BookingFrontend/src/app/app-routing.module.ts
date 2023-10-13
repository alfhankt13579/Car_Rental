import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarTypeListComponent } from './car-type-list/car-type-list.component';
import { BookingComponent } from './booking/booking.component';
import { BookedComponent } from './booked/booked.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'main view',
    component: MainViewComponent,
  },
  {
    path: 'car list',
    component: CarListComponent,
  },
  {
    path: 'car type/:carType',
    component: CarTypeListComponent,
  },
  {
    path: 'booking/:carId',
    component: BookingComponent,
  },
  {
    path: 'booked/:carId',
    component: BookedComponent,
  },
  {
    path: 'booking details/:clientId',
    component: BookingDetailsComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
