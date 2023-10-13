import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    mobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$'),
      ],
    ],
  });

  registerError: string = '';
  registerSuccess: any = '';

  register() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      let userName = this.registrationForm.value.userName;
      let mobileNumber = this.registrationForm.value.mobileNumber;
      let password = this.registrationForm.value.password;
      this.api.register(userName, mobileNumber, password).subscribe(
        (response: any) => {
          console.log(response);
          this.registerSuccess = response.message;
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 3000);
        },
        (response: any) => {
          this.registerError = response.error.message;
          setTimeout(() => {
            this.registrationForm.reset();
            this.registerError = '';
          }, 3000);
        }
      );
    } else {
      alert('Registration Invalid');
    }
  }
}
