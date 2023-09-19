import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { FirstTimeUserService } from './services/first-time-user.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeUserGuard implements CanActivate {
 
constructor(private router:Router , private firstTimeUser:FirstTimeUserService){}

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
  return this.firstTimeUser.getTransactions().pipe(
    map((transactions) => {
      const hasTransactions = transactions && transactions.length > 0;
      if (hasTransactions) {
        // User has transactions, allow access to the dashboard
        return true;
      } else {
        // User has no transactions, redirect to onboarding
        this.router.navigate(['/onBoarding']);
        return false;
      }
    })
  );
}
}