
import { Component } from '@angular/core';
import { Profile } from 'src/app/interfaces/transactions.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-second-nav-bar',
    templateUrl: './second-nav-bar.component.html',
    styleUrls: ['./second-nav-bar.component.css'],
})
export class SecondNavBarComponent {
    items: Profile | undefined;
    name!: string;

    constructor(
        private accountService: AccountService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.getAccountData();
    }

    logout() {
        this.auth.logout();
    }

    getAccountData() {
        this.accountService.getAccountData().subscribe((res: Profile) => {
            this.items = res;
            this.name = this.items.firstName;
            console.log('Items:', this.items)
            console.log('Name:', this.name)
        });
    }
}