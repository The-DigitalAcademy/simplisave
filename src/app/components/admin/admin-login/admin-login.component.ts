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

//   public loginForm!: FormGroup;

//   constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
//   ngOnInit() {
 
//     this.loginForm = this.formBuilder.group({

//       email: ['', [Validators.required, Validators.email,Validators.pattern(
//         '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$',
//       ),]],
//       password: ['', [Validators.required]]
//     });
//    }

  
//     //login() is a method for handling the login process.  Mukosi Budeli 08-August-2023
  
//   login() {

//   //It checks if the loginForm is valid and returns if it's not. Mukosi Budeli 08-August-2023
//     if(!this.loginForm.valid){
//       return;
//      }
 
//  //If valid it makes an HTTP GET request to the LOGIN_URL and holds the response from the API in res.  Mukosi Budeli 08-August-2023
//     this.http.get<any>(`${environment.LOGIN_URL}`)
//       .subscribe(
//         res=>{
 

//    // The find() method searches through the array using the parameter user which stores the data in the variable userCredentials if found. Mukosi Budeli 08-August-2023

//  const userCredentials = res.find((user:any)=>{
//             return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password 
//           });
//           console.log(userCredentials);
           
//           if(userCredentials){
//             this.authService.successAlert();
//             this.loginForm.reset();
//             this.router.navigate(["dashboard"]);
//             }
             
//           else{
//             this.authService.failedAlert();   // Displays a failed alert if no matching user is found or if an error occurs during the request.  
//             }
//           },
          
//       err=>{
//         this.authService.failedConnAlert();   // Displays a failed alert if there is no connection to the server.  
//         }) 
//     } 

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

  /* 
    login() is a method for handling the login process, once a user is logged in, we store the JWT token received in the response
    in a behavior subject so that it can be used in future.  
    the login method also update the authentication state.
    Sekhukhune Delphia
    01-August-2023
  */

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


