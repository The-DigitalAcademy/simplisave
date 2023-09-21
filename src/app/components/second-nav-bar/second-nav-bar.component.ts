import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-second-nav-bar',
    templateUrl: './second-nav-bar.component.html',
    styleUrls: ['./second-nav-bar.component.css'],
})
export class SecondNavBarComponent {
    items: any;
    name: any;

    constructor(
        private accountService: AccountService,
        private auth: AuthService,
        private stateService:StateService
    ) {}

    ngOnInit() {
        this.getAccountData();
        this.stateService.profileData$.subscribe((profileData) => {
            this.items=profileData;
            this.getAccountData();
          });

    }

    logout() {
        this.auth.logout();
    }

    getAccountData() {
        this.accountService.getAccountData().subscribe(res => {
            this.items = res;
            this.name = this.items.firstName;
        });
    }
}
