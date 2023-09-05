import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseModalComponent } from '../expense/expense-modal/expense-modal.component';
import { TransferModalComponent } from './transfer-modal/transfer-modal.component';

@Component({
    selector: 'app-top-part',
    templateUrl: './top-part.component.html',
    styleUrls: ['./top-part.component.css'],
})
export class TopPartComponent implements OnInit {
    availableBalance = 0;
    totalSaved = 0;
    items: any;
    items1: any;
    filteredData: any[] = [];
    sumMoneyOut: any;
    types: any;

    constructor(
        private dashService: DashboardService,
        private route: ActivatedRoute,
        private accountService: AccountService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getTypes();
        this.getAccountData();
        this.getDataFromApi();

        this.dashService.refreshObservable$.subscribe(() => {
            this.refreshComponent();
        });
    }

    // function to fetch account data , Mukosi Budeli 01/08/2023
    getAccountData() {
        this.accountService.getAccountData().subscribe(res => {
            this.items = res;

            
            this.availableBalance=this.items.accounts[0].accountBalance;
            
            this.totalSaved=this.items.accounts[0].savingsAccount.totalSavings;
            if(this.totalSaved===null){
              this.totalSaved=0;
            }
            

});
  }


  getTypes() {
    this.accountService.getTransactions2()
      .subscribe(res => {
        this.types = res;
        
      });
  }

 // Fetches transaction data from the API , Mukosi Budeli 01/08/2023
  getDataFromApi() {
    this.accountService.getTransactions2()
      .subscribe(res => {
        this.items1 = res;
        this.filterData();
      });
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
   
  
    // Step 5: Log the filtered data ,Mohammed Badat 01/08/2028
    
  }

  openTransferModal(): void {
    const dialogRef = this.dialog.open(TransferModalComponent, {
      width: '450px' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        
      }
    });
  }

  //called by above observable when the checklist needs to be refreshed
  private refreshComponent() {
    location.reload();
  }

}
