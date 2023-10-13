import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';
import { BookingComponent } from './booking/booking.component';
import { BookedComponent } from './booked/booked.component';
import { CarTypeListComponent } from './car-type-list/car-type-list.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainViewComponent,
    PageNotFoundComponent,
    CarListComponent,
    BookingComponent,
    BookedComponent,
    CarTypeListComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
