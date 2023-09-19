import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { FirstTimeUserService } from './services/first-time-user.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeUserGuard implements CanActivate {
 
constructor(private router:Router , private firstTimeUser:FirstTimeUserService){}

canActivate(): Observable<boolean> | boolean {
  return this.firstTimeUser.onBoardingCompleted$.pipe(
    take(1), // Take one value and complete the subscription
    map((completed) => {
      if (!completed) {
        this.router.navigate(['/onBoarding']);
        return false;
      }
      return true;
    })
  );
}
}