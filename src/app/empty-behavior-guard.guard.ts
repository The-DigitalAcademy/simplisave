import { AuthService } from 'src/app/services/auth-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmptyBehaviorGuardGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.getToken().pipe(
        map(token => {
          if (!token) {
            // Prevent navigation if token is empty
            // You can also navigate to a specific route here if desired
            return false;
          }
          return true;
        })
      );
  }
}
