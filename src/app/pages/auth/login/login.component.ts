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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  loginFormGroup: FormGroup = new FormGroup({});

 

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      // Define your form fields for login here
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  

  
}

//   login(): void {
//     this.http.get<any>('assets/users.json').subscribe(
//       (data) => {
//         const users = data.posts;
//         const user = users.find(
//           (u: any) =>
//             u.emailaddress === this.loginForm.value.email &&
//             u.password === this.loginForm.value.password
//         );
//         if (user) {
//           alert('Login success!!!');
//           this.loginForm.reset();
//           this.router.navigate(['dashboard']);
//         } else {
//           alert('User not found!!!');
//         }
//       },
//       (error) => {
//         alert('Something went wrong!!!');
//       }
//     );
//   }
// }