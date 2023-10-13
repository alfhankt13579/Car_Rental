import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: any;
  clientId: any = '';
  loginError: string = '';
  loginSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    mobileNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    sessionStorage.clear();
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let mobileNumber = this.loginForm.value.mobileNumber;
      let password = this.loginForm.value.password;
      this.api.login(mobileNumber, password).subscribe(
        (result: any) => {
          console.log(result);
          this.clientId = result.response.clientId;
          this.userName = result.response.userName;

          this.loginSuccess = true;
          sessionStorage.setItem('clientId', this.clientId);
          sessionStorage.setItem('userName', this.userName);

          setTimeout(() => {
            this.router.navigateByUrl('/main view');
          }, 2000);
        },
        (result: any) => {
          this.loginError = result.error.message;
          setTimeout(() => {
            this.loginForm.reset();
            this.loginError = '';
          }, 2000);
        }
      );
    } else {
      alert('Invalid Login');
    }
  }
}
