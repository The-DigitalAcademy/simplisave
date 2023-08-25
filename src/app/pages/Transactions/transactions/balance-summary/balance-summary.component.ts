import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.css'],
})
export class BalanceSummaryComponent implements OnInit {
  transactionsList: any[] = []; // Store your transactions here
  totalIncome: number = 0; // Total income for the specific month
  totalExpenses: number = 0; // Total expenses (money out) for the specific month
  availableBalance: number = 0; // Current balance calculated as totalIncome - totalExpenses
  currentBalance: any;

  constructor(
    private http: HttpClient,
    private transactionService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.getCurrentBalance();
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
      console.log(this.currentBalance);
      this.availableBalance = this.currentBalance[0].Balance;
      console.log(this.availableBalance);
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
}

