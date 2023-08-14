import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  transactionsList: any;
  groupedTransactions: any = {}; // Grouped transactions
  sortedDateKeys: string[] = []; // Declare sortedDateKeys property
  // transactionsList: any[] = []; // Store your transactions here
  totalIncome: number = 0; // Total income for the specific month
  totalExpenses: number = 0; // Total expenses (money out) for the specific month
  availableBalance: number = 0; // Current balance calculated as totalIncome - totalExpenses
  currentBalance: any;
  searchText: any;

  constructor(private transactionService: TransactionsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.fetchDataFromAPI();
    this.getCurrentBalance();

    // Toggle filter dropdown visibility on mobile devices
    $('#filterToggle').on('click', function() {
      $('#filterDropdown').toggle();
    });
  }

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList()
      .subscribe(res => {
        this.transactionsList = res;
        console.log(this.transactionsList);
        this.groupTransactions();
        console.log(this.groupTransactions);
      },
      error => {
        console.error('Error fetching data:', error);
      });
  }

  groupTransactions() {
    this.groupedTransactions = {};

    // Iterate through each transaction
    for (const details of this.transactionsList) {
      const date = details.transactionDate.slice(0, 10); // Extract date in 'YYYY-MM-DD' format

      if (!this.groupedTransactions[date]) {
        this.groupedTransactions[date] = [];
      }

      this.groupedTransactions[date].push(details);
    }
    this.sortedDateKeys = Object.keys(this.groupedTransactions).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }


  getCurrentBalance(){
    this.transactionService.getCurrentBalance()
      .subscribe(
        res => {
          this.currentBalance = res;
          console.log(this.currentBalance);
          this.availableBalance=this.currentBalance[0].Balance
          console.log(this.availableBalance)
        })
  }

  // applyDateFilter(): void {
  //   if (this.selectedDate) {
  //     this.filteredTransactions = this.transactions.filter((transaction: { date: string; }) =>
  //       transaction.date === this.selectedDate
  //     );
  //   } else {
  //     this.filteredTransactions = this.transactions;
  //   }
  // }

  // onDateChange(newDate: string): void {
  //   this.selectedDate = newDate;
  //   this.applyDateFilter();
  // }
}
