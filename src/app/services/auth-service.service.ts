import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment'; // Import environment variables
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  LOGIN_URL = /* `${environment.apiUrl}/signupUsers` */ 'https://springsimplisave-production.up.railway.app/api/auth/login';

//The constructor holds two parameter: http for making http request and router for navigating to different routes/components 
  constructor(private http: HttpClient, private router: Router) {}


  private tokenSubject = new BehaviorSubject<string>('');

  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }



  login(data:any) {
    return this.http.post<any>(`${environment.backendUrl}/auth/login`, data);
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

  successfulMoneyTransfer(){
    Swal.fire({
      icon: 'success',
      title: 'Money successfully transferred',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }


}
