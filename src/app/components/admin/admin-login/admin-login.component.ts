import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/transactions.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

//Initializing the loginForm using the formBuilder.group()
public loginForm!: FormGroup;
loginData: LoginData = { username: '', password: '' };

showPassword: boolean = false;


  
  constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
  ngOnInit() {
    //Initializing the loginForm using the formBuilder.group()
    this.loginForm = this.formBuilder.group({

      // Define form fields for login and validation requirements
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

   /* 
|------------------------------------------------------------------------------------------------------------
| Fetches API Data                                                            Created By Sekhukhune Delphia
|------------------------------------------------------------------------------------------------------------
| Created 2023-Aug-01                                                                 Modified: 2023-Sep-05
| login() is a method for handling the login process, once a user is logged in, we store the JWT token 
| received in the response in a behavior subject so that it can be used in future. the login method also
| update the authentication state.
|-------------------------------------------------------------------------------------------------------------
*/

login() {


  if (!this.loginForm.valid) {
    return;
  }

  this.authService.login(this.loginData).subscribe(
    (response: any) => {
      console.log('Token in LoginComponent:', response?.token); 
      console.log('Logged in successfully');
      const authToken = response?.token;                       // Extract the token property if it exists
      this.authService.setToken(authToken);                    // Set the token in the AuthService
      this.authService.successAlert();
      this.loginForm.reset();
      this.router.navigate(['admin']);
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







  