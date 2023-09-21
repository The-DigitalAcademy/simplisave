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
    Swal.close();
    localStorage.clear();
    window.location.href = '/login';
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome to SimpliSave',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    }).then(() => {
      // Navigate to the dashboard page
      this.router.navigate(['/dashboard']);
     });
  }

  failedAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User not found or incorrect credentials. Please try again',
      iconColor: '#AF144B',
      timer: 3000, // 3000 milliseconds (3 seconds)
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
      timer: 3000, // 3000 milliseconds (3 seconds)
      showConfirmButton: false, // Hide the "OK" button
    });
  }

  successfulMoneyTransfer() {
    Swal.fire({
      icon: 'success',
      title: 'Money successfully transferred',
      iconColor: '#AF144B',
      timer: 3000, // 3000 milliseconds (3 seconds)
      showConfirmButton: false, // Hide the "OK" button
    });
  }

 // Function to display the addGoal SweetAlert
 addGoal() {
  // Check if the addGoal alert has already been shown
  if (!localStorage.getItem('addGoalShown')) {
    Swal.fire({
      icon: 'warning',
      title: 'Please set a new savings goal',
      iconColor: '#AF144B',
      timer: 3000, // 3000 milliseconds (3 seconds)
      showConfirmButton: false, // Hide the "OK" button
    });

    // Set a flag in localStorage to indicate that the addGoal alert has been shown
    localStorage.setItem('addGoalShown', 'true');
  }
}

// Function to display the addNewGoal SweetAlert
 addNewGoal() {
  console.log(localStorage.getItem('addNewGoalShown'));
  // Check if the addNewGoal alert has already been shown
  if (!localStorage.getItem('addNewGoalShown')) {
    Swal.fire({
      icon: 'success',
      title: 'Congratulations you have achieved your saving goal',
      text: 'Your goal has been reset, please set a new goal',
      iconColor: '#AF144B',
      timer: 3000, // 3000 milliseconds (3 seconds)
      showConfirmButton: false, // Hide the "OK" button
    });

    // Set a flag in localStorage to indicate that the addNewGoal alert has been shown
    localStorage.setItem('addNewGoalShown', 'true');
  }
}
}



// Define a TokenResponse interface to match your server response
interface TokenResponse {
  access_token: string;
  // Add other properties if necessary
}
