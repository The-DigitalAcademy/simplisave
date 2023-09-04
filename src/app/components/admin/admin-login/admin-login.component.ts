import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

public loginForm!: FormGroup;
  username!: string;
  password!: string;
  loginData:any;


  
  constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
  ngOnInit() {
    //Initializing the loginForm using the formBuilder.group()
    this.loginForm = this.formBuilder.group({

      // Define form fields for login and validation requirements
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  

login() {
  this.loginData = {
    username: this.username,
    password: this.password
  };

  if (!this.loginForm.valid) {
    return;
  }

  this.authService.login(this.loginData).subscribe(
    (res: any) => {
      console.log('logged in:', res);
      this.authService.successAlert();
      this.loginForm.reset();
      this.router.navigate(['admin']);
    },
    (error: any) => {
      console.log('Not logged in:', error);
      this.authService.failedAlert(); // Show failed login alert
    }
  );
}
logout() {
  this.authService.logout();
}
 }


