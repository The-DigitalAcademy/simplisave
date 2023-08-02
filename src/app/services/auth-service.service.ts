import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


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
}
