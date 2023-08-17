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

  // function to fetch account data , Mukosi Budeli 01/08/2023
  getAccountData() {
    this.accountService.getAccountData()
          .subscribe(res => {
            this.items = res;
            this.availableBalance=this.items.accounts[0].accountBalance;
            console.log(this.items.accounts[0].accountBalance);

});
  }

 // Fetches transaction data from the API , Mukosi Budeli 01/08/2023
  getDataFromApi() {
    this.accountService.getTransactions2()
      .subscribe(res => {
        this.items1 = res;
        console.log(this.items1);
        this.filterData();
      });
  }

 // Fetches account data (such as available balance for a simplisave savings account) from an AP , Mukosi Budeli 01/08/2023
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
    // Step 1: Parse the date strings in the JSON data to JavaScript Date objects , Mohammed Badat 01/08/2023
    const transactions = this.items1.map((record: any) => ({
      ...record,
      transactionDate: new Date(record.transactionDate)
    }));
  
    // Step 2: Get the current month and year , Mohammed Badat 01/08/2023
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)
  
    // Step 3: Filter records where Money_Out is greater than 0 and Transaction_Date is within the current month , Moe 01/08/2023
    this.filteredData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.moneyOut > 0;
      const transactionDate = record.transactionDate;
      const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
  
      return isMoneyOutPositive && isWithinCurrentMonth;
    });
  
    // Step 4: Calculate the sum of Money_Out for the filtered records , Mohammed Badat 01/08/2023
    this.sumMoneyOut = this.filteredData.reduce((sum: number, record: any) => sum + record.moneyOut, 0);
    console.log(this.sumMoneyOut);
  
    // Step 5: Log the filtered data ,Mohammed Badat 01/08/2028
    console.log(this.filteredData);
  }

}
