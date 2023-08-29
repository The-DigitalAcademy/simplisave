import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
    constructor(private router: Router) {}

    navigateToRegisterComponent(): void {
        this.router.navigateByUrl('/register');
    }

    navigateToLearnComponent(): void {
        this.router.navigateByUrl('/learn');
    }
}
