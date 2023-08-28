import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    isSidebarOpen = false;

    constructor(private auth: AuthService) {}

    toggleSidebar(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    logout() {
        this.auth.logout();
    }
}
