import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  /*
      LOGIN-URL is a constant variable that holds the API URL for the login endpoint
      Sekhukhune Delphia
      01-August-2023
  */
  LOGIN_URL = "http://localhost:3000/signupUsers";

//The constructor holds two parameter: http for making http request and router for navigating to different routes/components 
  constructor(private http: HttpClient, private router: Router) {}


 /*
      The method takes an email and password and sends a POST request to the login API endpoint
      Sekhukhune Delphia
      0-August-2023
*/
  login(email: string, password: string) {
    // Replace url with login API endpoint
    return this.http.post<any>('http://localhost:3000/login', { email, password });
  }

 /*
      The method sends a GET request to the userdata api to fetch user specific data
      Sekhukhune Delphia
      01-August-2023
  */
  getUserData() {
    return this.http.get<any>(this.LOGIN_URL);
  }

   /*
      This method clears the session storage and navigate the user to the login route, logging them out
      Sekhukhune Delphia
      01-August-2023
  */
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

   /*
      This method displays a login success alert using Swal.fire() function.
      Sekhukhune Delphia
      03-August-2023
  */
  successAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!!!',
      text: "Welcome to simpliSave",
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
  })
  }

   /*
      This method displays a failed login alert using Swal.fire() function indicating that the user-credentials are either incorrect and not found in the database
      Sekhukhune Delphia
      03-August-2023
  */
  failedAlert(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'User not found or incorrect credentials. Please try again!!!',
    iconColor: '#AF144B',
    confirmButtonColor: '#AF144B'
  })
  }

   /*
      This method displays a failed connection alert using Swal.fire() function indicating connectivity problems to backend
      Sekhukhune Delphia
      03-August-2023
  */
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
