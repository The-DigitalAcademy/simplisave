// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators} from "@angular/forms";
// import { HttpClient } from '@angular/common/http';
// import { Router} from '@angular/router'
// import { OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth-service.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   /* 
//       Declaring loginForm of type FormGroup
//       Sekhukhune Delphia
//       01-August-2023
//   */
//   public loginForm!: FormGroup | any;
//   formGroup!: FormGroup;
//   // username!: string;
//   // password!: string;
//   // loginData:any;


  
//   constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {
 
//   this.loginForm = this.formBuilder.group({

//     // Define form fields for login and validation requirements
//     username: ['', [Validators.required, Validators.email,Validators.pattern(
//       '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$',
//     ),]],
//     password: ['', [Validators.required,Validators.pattern(
//       '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,65}$'
//     )]]
//   });
// }
//   ngOnInit() {
//     //Initializing the loginForm using the formBuilder.group()
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     })
   
//    }

//   /* 
//     login() is a method for handling the login process, once a user is logged in, we store the JWT token received in the response
//     in a behavior subject so that it can be used in future.  
//     the login method also update the authentication state.
//     Sekhukhune Delphia
//     01-August-2023
//   */

// // login() {
// //   this.loginData = {
// //     username: this.username,
// //     password: this.password
// //   };

// login(){

//   if (!this.loginForm.valid) {
//     return;
//   }
//   localStorage.setItem('user',this.loginForm.value)
//   this.router.navigate(['/dashboard'])
// }

// //   this.authService.login(this.loginData).subscribe(
// //     (res: any) => {
// //       console.log('logged in:', res);
// //       this.authService.successAlert();
// //       this.loginForm.reset();
// //       this.router.navigate(['dashboard']);
// //     },
// //     (error: any) => {
// //       this.authService.failedAlert(); // Show failed login alert
// //     }
// //   );
// // }
// logout() {
//   this.authService.logout();
// }
// }




import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // Define form fields for login here
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$',
      ),]],
      password: ['', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,65}$'
      )]]
    });
   }

  login() {
    if(!this.loginForm.valid){
      return;
     }

    this.http.get<any>(this.authService.LOGIN_URL)
      .subscribe(
        res=>{
          const userCredentials = res.find((user:any)=>{
            return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password
          });
          console.log(userCredentials);
          if(userCredentials){
            this.authService.successAlert();
            this.loginForm.reset();
            this.router.navigate(["dashboard"]);
            }
          else{
           this.authService.failedAlert();
            }
          },
      err=>{
       this.authService.failedConnAlert();
        })
    }
 }
