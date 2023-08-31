import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private tokenSubject = new BehaviorSubject<string | null>(null); // Change the type to string | null

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  
  setToken(token: string | null): void { // Change the parameter type to string | null
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> { // Change the return type to string | null
    return this.tokenSubject.asObservable();
  }

  login(data: any) {
    return this.http.post<any>(`${environment.LOGIN_URL}`, data).pipe(
      tap((res: any) => {
        const token = res['token'].token;
        this.setToken(token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  getUserData() {
    return this.http.get<any>(`${environment.apiUrl}/signupUsers`);
  }

  logout() {
    sessionStorage.clear();
    this.isAuthenticatedSubject.next(false);
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
