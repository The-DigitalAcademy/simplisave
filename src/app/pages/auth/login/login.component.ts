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
  /* 
      Declaring loginForm of type FormGroup
      Sekhukhune Delphia
      01-August-2023
  */
  public loginForm!: FormGroup;

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private authService : AuthService, private router: Router) {}
 
  ngOnInit() {
    //Initializing the loginForm using the formBuilder.group()
    this.loginForm = this.formBuilder.group({

      // Define form fields for login and validation requirements
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,65}$',
      ),]],
      password: ['', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,65}$'
      )]]
    });
   }

  /* 
    login() is a method for handling the login process.  
    Sekhukhune Delphia
    01-August-2023
  */
  login() {

  //It checks if the loginForm is valid and returns if it's not. 
    if(!this.loginForm.valid){
      return;
     }
 
 //If valid it makes an HTTP GET request to the LOGIN_URL and holds the response from the API in res.
    this.http.get<any>(this.authService.LOGIN_URL)
      .subscribe(
        res=>{
 
 /* 
    The find() method searches through the array using the parameter user which stores the data in the variable userCredentials if found.
    Sekhukhune Delphia
      01-August-2023
 */
 const userCredentials = res.find((user:any)=>{
            return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password 
          });
          console.log(userCredentials);
           // Displays a success alert and navigates to the dashboard if a match is found.
          if(userCredentials){
            this.authService.successAlert();
            this.loginForm.reset();
            this.router.navigate(["dashboard"]);
            }
              // Displays a failed alert if no matching user is found or if an error occurs during the request.  
          else{
            this.authService.failedAlert();
            }
          },
          // Displays a failed alert if there is no connection to the server.  
      err=>{
        this.authService.failedConnAlert();
        })
    } 
 }


