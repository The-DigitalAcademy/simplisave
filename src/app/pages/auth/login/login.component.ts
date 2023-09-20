import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { LoginData, TokenResponse } from 'src/app/interfaces/transactions.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Initializing the loginForm using the formBuilder.group()
  public loginForm!: FormGroup;
  loginData: LoginData = { username: '', password: '' };

  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Define form fields for login and validation requirements
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,65}$'
          ),
        ],
      ],
    });
  }

  /* 
  |------------------------------------------------------------------------------------------------------------
  | Fetches API Data                                                            Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-14
  |  login() is a method for handling the login process, once a user is logged in, we store the JWT token 
  |  received in the response in a behavior subject so that it can be used in future. the login method also
  |  update the authentication state.
  |-------------------------------------------------------------------------------------------------------------
  */

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        
        const authToken = response?.token;                       // Extract the token property if it exists
        this.authService.setToken(authToken);                    // Set the token in the AuthService
        this.authService.successAlert();
        this.loginForm.reset();
      },
      (error) => {
        this.authService.failedAlert();
      }
    );
  }
  
  // Toggle the visibility of the password field
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Calls the logout method in the AuthService
  logout() {
    this.authService.logout();
  }
}
