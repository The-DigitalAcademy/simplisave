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
            alert('Login Succesful!!!');
            this.loginForm.reset();
            this.router.navigate(["dashboard"]);
            }
          else{
            alert("User not found or incorrect credentials. Please try again.")
            }
          },
      err=>{
        alert("Something went wrong during login. Please try again.")
        })
    } 
 }


