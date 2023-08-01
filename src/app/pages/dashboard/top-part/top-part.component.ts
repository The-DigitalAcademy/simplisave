import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.css']
})
export class TopPartComponent implements OnInit {

  availableBalance: number = 0;
  totalSaved: number = 0;
  items:any;
  items1:any;
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getDataFromApi();
    this. getSimplisaveData();
  }

  getDataFromApi() {
    this.accountService.getAccountData()
          .subscribe(res => {
            this.items = res;
            console.log(this.items);
            this.availableBalance=this.items[0].Balance
            console.log(this.availableBalance)
});
  }

  getSimplisaveData(){

    this.accountService.getSimplisaveData()
               .subscribe(res=>{
                this.items1 = res;
                console.log(this.items1);
                this.totalSaved=this.items1[0].Balance
                console.log(this.totalSaved)
               })
  }

}
