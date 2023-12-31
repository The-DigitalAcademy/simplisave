import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { TransferModalComponent } from './transfer-modal/transfer-modal.component';
import { Profile, Transaction, TransactionRecord } from 'src/app/interfaces/transactions.model';
import { StateService } from 'src/app/services/state.service';



@Component({
  selector: 'app-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.css'],
})
export class TopPartComponent implements OnInit {
  availableBalance = 0;
  totalSaved = 0;
  items: Profile | undefined;
  items1: Transaction[] = [];
  filteredData: TransactionRecord[] = [];
  sumMoneyOut!: number;

  constructor(
    private dashService: DashboardService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private stateService:StateService
  ) { }

  ngOnInit() {
    this.getAccountData();
    this.getDataFromApi();

    this.dashService.refreshObservable$.subscribe(() => {
      this.refreshComponent();
    });


    this.stateService.accountData$.subscribe((updatedAccountDetails) => {
      this.items=updatedAccountDetails;
      console.log(this.items);
      // Handle the updated category list here and update your UI
      // For example, you can assign the updatedCategoryList to a local variable.
      this.getAccountData();
      this.getDataFromApi();
    });
  }

  // function to fetch account data , Mukosi Budeli 01/08/2023
  getAccountData() {
    this.accountService.getAccountData().subscribe(
      (res: Profile) => {
        // console.log('API Response top part getAccountData:', res);
        this.items = res;
        this.availableBalance = this.items.accounts[0].accountBalance;
        this.totalSaved = this.items.accounts[0].savingsAccount.totalSavings || 0;
        if (this.totalSaved === null) {
          this.totalSaved = 0;
        }
      },
      (error) => {
        console.error('Error fetching account data:', error);
      }
    );
  }


  // Fetches transaction data from the API , Mukosi Budeli 01/08/2023
  getDataFromApi() {
    this.accountService.getTransactions2()
      .subscribe((res: Transaction[]) => {
        this.items1 = res;
         console.log('Getting data from the api', this.items1)
        this.filterData();
      });
  }

  filterData() {
    // Step 1: Parse the date strings in the JSON data to JavaScript Date objects , Mohammed Badat 01/08/2023
    const transactions = this.items1.map((record: Transaction) => ({
      ...record,
      transactionDate: new Date(record.transactionDate)
    }));

    // Step 2: Get the current month and year , Mohammed Badat 01/08/2023
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    // Step 3: Filter records where Money_Out is greater than 0 and Transaction_Date is within the current month , Moe 01/08/2023
    this.filteredData = transactions.filter((record: TransactionRecord) => {
      const isMoneyOutPositive = record.moneyOut > 0;
      const transactionDate = record.transactionDate;
      const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;

      return isMoneyOutPositive && isWithinCurrentMonth;
    });

    // Step 4: Calculate the sum of Money_Out for the filtered records , Mohammed Badat 01/08/2023
    this.sumMoneyOut = this.filteredData.reduce((sum: number, record: TransactionRecord) => sum + record.moneyOut, 0);

    // console.log('filtered data', this.filteredData)
    // Step 5: Log the filtered data ,Mohammed Badat 01/08/2028

  }

  openTransferModal(): void {
    const dialogRef = this.dialog.open(TransferModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {

      }
    });
  }

  //called by above observable when the checklist needs to be refreshed
  private refreshComponent() {
    location.reload();
  }

  formatToTwoDecimalPlaces(value: number | undefined | null): string {
    if (value === undefined || value === null) {
      return 'N/A';
    } else {
      return value.toFixed(2);
    }
  }

}