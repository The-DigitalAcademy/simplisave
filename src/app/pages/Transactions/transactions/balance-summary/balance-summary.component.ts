import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profile, Transaction, User } from 'src/app/interfaces/transactions.model';
import { AccountService } from 'src/app/services/account.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.css'],
})
export class BalanceSummaryComponent implements OnInit {
  transactionsList: Transaction[] = []; // Store your transactions here
  totalIncome: number = 0; // Total income for the specific month
  totalExpenses: number = 0; // Total expenses (money out) for the specific month
  availableBalance: number = 0; // Current balance calculated as totalIncome - totalExpenses
  currentBalance: Profile | undefined;
  displayedTransactions: Transaction[] = [];
  searchFilter: string = '';

  constructor(
    private http: HttpClient,
    private transactionService: TransactionsService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.getAccountData();
  }

  /*
  |------------------------------------------------------------------------------------------------------------
  | Fetches API Data                                                            Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-19
  | This method fetches a list of transactions from an API using the transactionService.
  | After successfully fetching data, it calls calculateTotalsForMonth() method to calculate income and expenses.
  |
  |-------------------------------------------------------------------------------------------------------------
  */


  fetchDataFromAPI() {
    this.transactionService.getTransactionsList().subscribe(
      (res: Transaction[]) => {
        this.transactionsList = res;

        this.calculateTotalsForMonth();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  /*
  |------------------------------------------------------------------------------------------------------------
  | Fetches Available balance from everyday banking account                      Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-14
  | This method fetches account data from an API using the accountService and subscribes to the observable
  | returned by getAccountData() to update the availableBalance property.
  |
  |-------------------------------------------------------------------------------------------------------------
  */

  // getAccountData() {
  //   this.accountService.getAccountData()
  //     .subscribe(res => {
  //       this.currentBalance = res;
  //       this.availableBalance = this.currentBalance.accounts[0].accountBalance;

  //     });
  // }

  getAccountData() {
    this.accountService.getAccountData().subscribe(
      (res: Profile) => {
        console.log('API Response balance summary getAccountData:', res);
        this.currentBalance = res;
        this.availableBalance = this.currentBalance.accounts[0].accountBalance;
      },
      (error) => {
        console.error('Error fetching account data:', error);
      }
    );
  }
 

  /*
  |------------------------------------------------------------------------------------------------------------
  | Calculate total income and expense for the current month                     Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-24
  | This method calculates the total income and total expenses for the current month based on the transactionsList.
  | It uses the current date to determine the current month and and sums up money in and money out from the
  | transactions for the current month, updating totalIncome and totalExpenses.
  |
  |-------------------------------------------------------------------------------------------------------------
  */
  calculateTotalsForMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0-based index)


    this.totalIncome = this.transactionsList
      .filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        return (
          transaction.moneyIn > 0 && // Filter money in
          transactionMonth === currentMonth

        );
      })
      .reduce((total, transaction) => total + transaction.moneyIn, 0);

    this.totalExpenses = this.transactionsList
      .filter(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        return (
          transaction.moneyOut > 0 && // Filter money out
          transactionMonth === currentMonth
        );
      })
      .reduce((total, transaction) => total + transaction.moneyOut, 0);
  }

   /*
  |------------------------------------------------------------------------------------------------------------
  | Search Filter                                                                Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-29
  | This method sets the search filter in the transactionService using setSearchFilter(). It then filters the
  | transactionsList based on the search filter (transaction description or amount). The filtered transactions are
  | stored in displayedTransactions. If no filter is provided, it displays all transactions.
  |
  |-------------------------------------------------------------------------------------------------------------
  */
  applySearchFilter() {
    this.transactionService.setSearchFilter(this.searchFilter); // Set the search filter in the service
    const filter = this.searchFilter.toLowerCase();

    if (filter) {
      this.displayedTransactions = this.transactionsList.filter(
        (transaction: Transaction) =>
          transaction.description.toLowerCase().includes(filter)
      );
    } else {
      // If no filter provided, show all transactions
      this.displayedTransactions = [...this.transactionsList];
    }
  }

}