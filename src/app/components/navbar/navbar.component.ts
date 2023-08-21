import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  token: string = ''; // Initialize a variable to hold the token
  name!:string;

  constructor(private authService: AuthService, private accountService:AccountService) {} // Inject your token service

  ngOnInit(): void {
    this.authService.getToken().subscribe((token) => {
      this.token = token; // Update the local variable with the latest token value
    });
    console.log(this.token);

    if(this.token){
      this.getUserName();
    }
  }

  getUserName(){

 
    this.accountService.getAccountData().subscribe((res: any) => {
      this.name = res.firstName;


     
    });

  }


}
