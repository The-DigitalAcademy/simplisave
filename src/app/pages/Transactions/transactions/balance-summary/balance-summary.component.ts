import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transactions.model';
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
  currentBalance: any;
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

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList().subscribe(
      res => {
        this.transactionsList = res;
        
        this.calculateTotalsForMonth();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCurrentBalance() {
    this.transactionService.getCurrentBalance().subscribe(res => {
      this.currentBalance = res;
      this.availableBalance = this.currentBalance[0].accountBalance;
    });
  }

  getAccountData() {
    this.accountService.getAccountData()
      .subscribe(res => {
        this.currentBalance = res;
        this.availableBalance = this.currentBalance.accounts[0].accountBalance;

      });
  }

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