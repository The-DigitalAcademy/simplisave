// auth-service.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginData } from '../interfaces/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private tokenSubject = new BehaviorSubject<string | null>(null);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  
  setToken(token: string | null): void {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // login(data: LoginData): Observable<TokenResponse> {
  //   return this.http.post<TokenResponse>(`${environment.LOGIN_URL}`, data).pipe(
  //     tap((res: TokenResponse) => {
  //       console.log('API Response:', res);
  //       const authToken = res.access_token;
  //       this.setToken(authToken);
  //       this.isAuthenticatedSubject.next(true);
  //     })
  //   );
  // }
  

  login(data: LoginData): Observable<any> {
    return this.http.post(`${environment.LOGIN_URL}`, data).pipe(
      tap((response: any) => {
        const authToken = response?.token; // Extract the token property if it exists
        console.log('Token in AuthService:', authToken);
        this.setToken(authToken);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }
  
  
  
  
  

  // getUserData() {
  //   return this.http.get<any>(`${environment.apiUrl}/signupUsers`);
  // }

  logout() {
    sessionStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome to SimpliSave',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  failedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User not found or incorrect credentials. Please try again',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  failedConnAlert() {
    Swal.fire({
      icon: 'question',
      title: 'Unable to connect',
      text: 'Please check your connection and try again!!!',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  successfulUpdate() {
    Swal.fire({
      icon: 'success',
      title: 'Details successfully updated',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }

  successfulMoneyTransfer() {
    Swal.fire({
      icon: 'success',
      title: 'Money successfully transferred',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }
}

// Define a TokenResponse interface to match your server response
interface TokenResponse {
  access_token: string;
  // Add other properties if necessary
}
