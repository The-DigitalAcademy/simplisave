import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  LOGIN_URL = `${environment.apiUrl}/signupUsers`;

//The constructor holds two parameter: http for making http request and router for navigating to different routes/components 
  constructor(private http: HttpClient, private router: Router) {}



  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password });
  }

  getUserData() {

    return this.http.get<any>(`${environment.apiUrl}/signupUsers`);

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  successAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!!!',
      text: 'Welcome to simpliSave',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  failedAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User not found or incorrect credentials. Please try again!!!',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  failedConnAlert(){
    Swal.fire({
      icon:  'question',
      title: 'Unable to connect',
      text: 'Please check your connection and try again!!!',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }


  successfulUpdate(){
    Swal.fire({
      icon: 'success',
      title: 'Details successfuly updated',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }
}
