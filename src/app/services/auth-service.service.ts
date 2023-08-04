import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  LOGIN_URL = "http://localhost:3000/signupUsers";

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    // Replace url with login API endpoint
    return this.http.post<any>('http://localhost:3000/login', { email, password });
  }

  getUserData() {
    // Replace url with user data API endpoint
    return this.http.get<any>('http://localhost:3000/signupUsers');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  successAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!!!',
      text: "Welcome to simpliSave",
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
  })
  }

  failedAlert(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'User not found or incorrect credentials. Please try again!!!',
    iconColor: '#AF144B',
    confirmButtonColor: '#AF144B'
  })
  }

  failedConnAlert(){
    Swal.fire({
      icon:  'question',
      title: 'Unable to connect',
      text: 'Please check your connection and try again!!!',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    })
    }
}
