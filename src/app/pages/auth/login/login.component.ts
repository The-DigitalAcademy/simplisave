import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]],
      password: ['', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )]]
    });
  }

 

 
  ngOnInit() {
    // this.loginForm = this.fb.group({
    //   // Define your form fields for login here
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
  }

  login() {
    if(!this.loginForm.valid){
      return;
    }
    this.http.get<any>('https://localhost/signupUsers').subscribe(
      (data) => {
        const users = data.posts;
        const user = users.find(
          (u: any) =>
            u.emailaddress === this.loginForm.value.email &&
            u.password === this.loginForm.value.password
        );
        if (user) {
          alert('Login success!!!');
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        } else {
          alert('User not found!!!');
        }
      },
      (error) => {
        alert('Something went wrong!!!');
      }
    );
  }
  
}




//   login(): void {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       this.authService.login(email, password).subscribe(
//         (data) => {
//           // If login is successful, data may contain user-specific information
//           if (data && data.token) {
//             // Save user data in session storage or any other state management technique
//             // For example:
//             // sessionStorage.setItem('token', data.token);

//             // Fetch user-specific data from the API and save it in the application state
//             this.authService.getUserData().subscribe(
//               (userData) => {
//                 // Save user data in session storage or any other state management technique
//                 // For example:
//                 // sessionStorage.setItem('userData', JSON.stringify(userData));

//                 // Redirect to the desired page after successful login
//                 this.router.navigate(['/dashboard']);
//               },
//               (error) => {
//                 // Handle error while fetching user data
//               }
//             );
//           } else {
//             // Handle login error, such as invalid credentials
//             alert('User not found!!!');
//           }
//         },
//         (error) => {
//           // Handle error during login API call
//           alert('Something went wrong!!!');
//         }
//       );
//     } else {
//       // Handle form validation errors
//       alert('Please enter valid data.');
//     }
//   }
// }



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient, private router: Router) {}

//   login(email: string, password: string) {
//     // Replace 'https://localhost/login' with your actual login API endpoint
//     return this.http.post<any>('https://localhost/login', { email, password });
//   }

//   getUserData() {
//     // Replace 'https://localhost/userdata' with your actual user data API endpoint
//     // You may need to pass the user's authentication token in the request headers
//     return this.http.get<any>('https://localhost/userdata');
//   }

//   logout() {
//     // Implement logout logic here
//     // For example, clear user data from storage and navigate to the login page
//     // sessionStorage.clear();
//     // this.router.navigate(['/login']);
//   }
// }




