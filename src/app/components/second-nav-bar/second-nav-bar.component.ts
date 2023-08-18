import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-second-nav-bar',
  templateUrl: './second-nav-bar.component.html',
  styleUrls: ['./second-nav-bar.component.css']
})
export class SecondNavBarComponent {
  items:any;
  name:any;

    
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccountData();

  }



  getAccountData() {
    this.accountService.getAccountData()
          .subscribe(res => {
            this.items = res;
            this.name=this.items.firstName;
            console.log(this.items.firstName);


});
  }

}
