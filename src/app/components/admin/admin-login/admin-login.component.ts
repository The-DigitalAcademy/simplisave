import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  public loginForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
  ngOnInit() {
 
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$',
      ),]],
      password: ['', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,65}$'
      )]]
    });
   }

  
    //login() is a method for handling the login process.  Mukosi Budeli 08-August-2023
  
  login() {

  //It checks if the loginForm is valid and returns if it's not. Mukosi Budeli 08-August-2023
    if(!this.loginForm.valid){
      return;
     }
 
 //If valid it makes an HTTP GET request to the LOGIN_URL and holds the response from the API in res.  Mukosi Budeli 08-August-2023
    this.http.get<any>(this.authService.LOGIN_URL)
      .subscribe(
        res=>{
 

   // The find() method searches through the array using the parameter user which stores the data in the variable userCredentials if found. Mukosi Budeli 08-August-2023

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
            this.authService.failedAlert();   // Displays a failed alert if no matching user is found or if an error occurs during the request.  
            }
          },
          
      err=>{
        this.authService.failedConnAlert();   // Displays a failed alert if there is no connection to the server.  
        }) 
    } 
 }


