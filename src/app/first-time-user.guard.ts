import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeUserGuard implements CanActivate {
 
constructor(private router:Router){}

canActivate(): boolean{
  const isFirstTimeUser = !localStorage.getItem('onBoardingComponent');

  if(isFirstTimeUser){
    this.router.navigate(['/onBoarding']);
    return false;
  }
return true;
}
  
}