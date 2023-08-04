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
  filteredData: any[] = []; 
  sumMoneyOut: any;
  
  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getAccountData();
    this.getDataFromApi()
    this. getSimplisaveData();
  }

  // function to fetch account data
  getAccountData() {
    this.accountService.getAccountData()
          .subscribe(res => {
            this.items = res;
            console.log(this.items);
            this.availableBalance=this.items[0].Balance
            console.log(this.availableBalance)
});
  }

 // Fetches transaction data from the API 
  getDataFromApi() {
    this.accountService.getTransactions()
      .subscribe(res => {
        this.items1 = res;
        console.log(this.items1);
        this.filterData();
      });
  }

 // Fetches account data (such as available balance for a simplisave savings account) from an AP
  getSimplisaveData(){
    this.accountService.getSimplisaveData()
               .subscribe(res=>{
                this.items1 = res;
                console.log(this.items1);
                this.totalSaved=this.items1[0].Balance
                console.log(this.totalSaved)
               })
  }
  filterData() {
    // Step 1: Parse the date strings in the JSON data to JavaScript Date objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      Transaction_Date: new Date(record.Transaction_Date)
    }));
  
    // Step 2: Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)
  
    // Step 3: Filter records where Money_Out is greater than 0 and Transaction_Date is within the current month
    this.filteredData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
  
      return isMoneyOutPositive && isWithinCurrentMonth;
    });
  
    // Step 4: Calculate the sum of Money_Out for the filtered records
    this.sumMoneyOut = this.filteredData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
    console.log(this.sumMoneyOut);
  
    // Step 5: Log the filtered data
    console.log(this.filteredData);
  }

}
