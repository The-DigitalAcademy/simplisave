import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';
import Swal from 'sweetalert2';

@Injectable()
export class SessionTimeoutInterceptor implements HttpInterceptor {
  private sessionTimeoutMillis = 5 * 60 * 1000; // 5 minutes in milliseconds
  private lastActivity: number;

  constructor(private router: Router, private authService:AuthService) {
    this.lastActivity = Date.now();
    this.startInactivityTimer();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.resetInactivityTimer();

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle unauthorized error (e.g., log out the user)
          this.handleSessionTimeout();
        }
        return throwError(error);
      })
    );
  }

  private startInactivityTimer() {
    setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastActivity;

      if (elapsedTime >= this.sessionTimeoutMillis) {
        this.handleSessionTimeout();
      }
    }, 1000);
  }

  private resetInactivityTimer() {
    this.lastActivity = Date.now();
  }

  private handleSessionTimeout() {
    this.authService.setToken('');
    Swal.close();
    localStorage.clear();
    window.location.href = '/login';
    
  }
}
