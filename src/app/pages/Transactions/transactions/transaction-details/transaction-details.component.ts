import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery'; // Import jQuery library
import { TransactionsService } from 'src/app/services/transactions.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/Interface/transaction.model';




@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  transactionsList: Transaction[] = [];
  groupedTransactions: any = {}; // Grouped transactions
  sortedDateKeys: string[] = []; // Declare sortedDateKeys property
  // transactionsList: any[] = []; // Store your transactions here
  totalIncome: number = 0; // Total income for the specific month
  totalExpenses: number = 0; // Total expenses (money out) for the specific month
  availableBalance: number = 0; // Current balance calculated as totalIncome - totalExpenses
  currentBalance: any;
  searchText: any;
  searchForm: FormGroup = new FormGroup({});
  filteredTransactions: Transaction[] = [];
  filteredGroupedTransactions: any = {};
  selectedDate: Date | null = null;

  constructor(private transactionService: TransactionsService, private http: HttpClient, private formBuilder: FormBuilder)
  {
    this.searchForm = this.formBuilder.group({
      transactionDate: [null],
      description: [null],
      amount:[null]
    });
 
   
    this.fetchDataFromAPI();
    // this.getCurrentBalance();
 
     // Toggle filter dropdown visibility on mobile devices
     // Toggle filter dropdown visibility on mobile devices
     $('#filterToggle').on('click', function() {
      $('#filterDropdown').toggle();
    });
  }

  ngOnInit(): void {
    // this.fetchDataFromAPI();
    // this.fetchDataFromAPI();
    // this.getCurrentBalance();
   
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

    // Iterate through each transaction in the transactionsList
    for (const details of this.transactionsList) {
      // Extract the date from the transactionDate in 'YYYY-MM-DD' format
      const date = details.transactionDate.slice(0, 10);

      // Check if there is no existing array for this date in groupedTransactions
      if (!this.groupedTransactions[date]) {
        // If not, create an empty array for this date in groupedTransactions
        this.groupedTransactions[date] = [];
      }

      // Push the current transaction details into the array for this date
      this.groupedTransactions[date].push(details);
    }

    // Get an array of sorted date keys in descending order
    this.sortedDateKeys = Object.keys(this.groupedTransactions).sort((a, b) => {
      // Compare the dates in reverse order to sort in descending order
      return new Date(b).getTime() - new Date(a).getTime();
    });
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