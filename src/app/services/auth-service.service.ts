import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment'; // Import environment variables
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  LOGIN_URL = /* `${environment.apiUrl}/signupUsers` */ 'https://springsimplisave-production.up.railway.app/api/auth/login';

//The constructor holds two parameter: http for making http request and router for navigating to different routes/components 
  constructor(private http: HttpClient, private router: Router) {}


  private tokenSubject = new BehaviorSubject<string>('');

  //BehaviorSubject for managing the user's authentication state.
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Components can subscribe to this observable to receive updates about the authentication state.
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  

  setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

//the login method to set the authentication state to true when the login is successful
  login(data: any) {
    return this.http.post<any>(`${environment.backendUrl}/auth/login`, data).pipe(
      tap((res: any) => {
        const token = res['token'].token;
        this.setToken(token);
        this.isAuthenticatedSubject.next(true); // Set authentication state to true
      })
    );
  }
  

  // login(data:any) {
  //   return this.http.post<any>(`${environment.backendUrl}/auth/login`, data);
  // }
  getUserData() {

    return this.http.get<any>(`${environment.apiUrl}/signupUsers`);

  }



  // logout() {
  //   sessionStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  //set the authentication state to false when the user logs out.
  logout() {
    sessionStorage.clear();
    this.isAuthenticatedSubject.next(false); // Set authentication state to false
    this.router.navigate(['/login']);
  }
  



  successAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome to SimpliSave',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  failedAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User not found or incorrect credentials. Please try again',
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
