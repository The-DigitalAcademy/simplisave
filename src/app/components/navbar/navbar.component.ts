import { Component } from '@angular/core';
import { NavbarData, Profile } from 'src/app/interfaces/transactions.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  token: string|null = ''; // Initialize a variable to hold the token
  data: NavbarData = { name: '' }; // Initialize the data using the interface modified by Delphia Sekhukhune 2023-Sep-05

  constructor(private authService: AuthService, private accountService:AccountService) {} // Inject your token service

  ngOnInit(): void {
    this.authService.getToken().subscribe((token) => {
      this.token = token; // Update the local variable with the latest token value
    });

    if(this.token){
      this.getUserName();
    }
  }

  getUserName(){

 
    this.accountService.getAccountData().subscribe((res: Profile) => {
      this.data.name = res.firstName;
      console.log('username', this.data.name)

     
    });

  }


}