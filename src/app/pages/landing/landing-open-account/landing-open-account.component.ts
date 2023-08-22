import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing-open-account',
    templateUrl: './landing-open-account.component.html',
    styleUrls: ['./landing-open-account.component.css'],
})
export class LandingOpenAccountComponent {
    constructor(private router: Router) {}

    navigateToRegisterComponent(): void {
        this.router.navigateByUrl('/register');
    }
}
