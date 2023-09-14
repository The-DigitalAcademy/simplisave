import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/transactions.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  // Initializing the loginForm using the formBuilder.group()
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
    // Initializing the loginForm using the formBuilder.group()
    this.loginForm = this.formBuilder.group({
      // Define form fields for login and validation requirements
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // |------------------------------------------------------------------------------------------------------------
// | Login                                                           Created By Mukosi Budeli
// |------------------------------------------------------------------------------------------------------------
// | Created 2023-Aug-01                                                                 Modified: 2023-Sep-05
// | login() is a method for handling the login process, once a user is logged in, we store the JWT token 
// | received in the response in a behavior subject so that it can be used in future. the login method also
// | update the authentication state.
// |-------------------------------------------------------------------------------------------------------------
// */

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    // Check if the user's email is admin@gmail.com
    const userEmail = this.loginForm.get('username')?.value;
    
    if (userEmail === 'admin@gmail.com') {
      // User is authorized, proceed with login
      this.authService.login(this.loginData).subscribe(
        (response: any) => {
          const authToken = response?.token;
          this.authService.setToken(authToken);
          this.authService.successAlert();
          this.loginForm.reset();
          this.router.navigate(['admin']);
        },
        (error: any) => {
          this.authService.failedAlert();
        }
      );
    } else {
      // User is not authorized, handle accordingly (e.g., show an error message)
      console.error('Unauthorized access!');
      Swal.fire({
        icon: 'error',
        title: 'Oops... User is not authorized',
        iconColor: 'red',
        confirmButtonColor: '#AF144B',
      })
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  logout() {
    this.authService.logout();
  }
}
