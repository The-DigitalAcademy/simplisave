import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as $ from 'jquery'; // Import jQuery library
import { TransactionsService } from 'src/app/services/transactions.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transactions.model';




@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  transactionsList: Transaction[] = []; // Store your transactions here
  groupedTransactions: any = {}; // Grouped transactions
  sortedDateKeys: string[] = []; // Declare sortedDateKeys property
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
    this.sortedDateKeys = Object.keys(this.transactionsList).sort((a, b) => {
      // Compare the dates in reverse order to sort in descending order
      return new Date(b).getTime() - new Date(a).getTime();
    });
}


  

  // getCurrentBalance(){
  //   this.transactionService.getCurrentBalance()
  //     .subscribe(
  //       res => {
  //         this.currentBalance = res;
  //         console.log(this.currentBalance);
  //         this.availableBalance=this.currentBalance[0].Balance
  //         console.log(this.availableBalance)
  //       })
  // }


 
  applyFilter(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      // When a date is selected from the date picker
      this.selectedDate = event.value;
  
      // Initialize an empty object to store filtered grouped transactions
      this.filteredGroupedTransactions = {};
  
      // Iterate through each date in the grouped transactions
      for (const date in this.groupedTransactions) {
        // Filter details for the current date based on the selected date
        const filteredDetails = this.groupedTransactions[date].filter((details: any) => {
          const transactionDate = new Date(details.transactionDate);
  
          // Check if the selectedDate matches the transaction's date
          if (this.selectedDate) {
            return (
              transactionDate.getFullYear() === this.selectedDate.getFullYear() &&
              transactionDate.getMonth() === this.selectedDate.getMonth() &&
              transactionDate.getDate() === this.selectedDate.getDate()
            );
          }
  
          return false; // Return false if selectedDate is null
        });
  
        // Store the filtered details for the current date
        if (filteredDetails.length > 0) {
          this.filteredGroupedTransactions[date] = filteredDetails;
        }
      }
    } else {
      // When no date is selected, reset the selectedDate and show all transactions
      this.selectedDate = null;
      this.filteredGroupedTransactions = this.groupedTransactions;
    }
  }
  
 
 
  isSelectedDate(transactionDate: string): boolean {
    // Check if a date is selected
    if (this.selectedDate) {
      // Convert the selected date to a string in 'YYYY-MM-DD' format
      const selectedDateStr = this.selectedDate.toISOString().substring(0, 10);
  
      // Check if the transaction date starts with the selected date string
      return transactionDate.startsWith(selectedDateStr);
    }
  
    return false; // Return false if no date is selected
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







// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import * as $ from 'jquery';
// import { TransactionsService } from 'src/app/services/transactions.service';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';
// import { Transaction } from 'src/app/Interface/transaction.model';

// @Component({
//   selector: 'app-transaction-details',
//   templateUrl: './transaction-details.component.html',
//   styleUrls: ['./transaction-details.component.css']
// })
// export class TransactionDetailsComponent implements OnInit {

//   transactionsList: Transaction[] = []; // Specify the type
//   groupedTransactions: { [date: string]: Transaction[] } = {}; // Specify the type
//   sortedDateKeys: string[] = [];
//   filteredTransactions: Transaction[] = [];
//   filteredGroupedTransactions: { [date: string]: Transaction[] } = {};
//   sortedFilteredDateKeys: string[] = [];
//   selectedDate: Date | null = null;
//   searchForm: FormGroup = new FormGroup({}); 

//   constructor(private transactionService: TransactionsService, private formBuilder: FormBuilder) {
//     this.searchForm = this.formBuilder.group({
//       transactionDate: [null],
//     });

//     // Toggle filter dropdown visibility on mobile devices
//     $('#filterToggle').on('click', function() {
//       $('#filterDropdown').toggle();
//     });
//   }

//   ngOnInit(): void {
//     this.fetchDataFromAPI();
//   }

//   fetchDataFromAPI() {
//     this.transactionService.getTransactionsList()
//       .subscribe(
//         (res: Transaction[]) => {
//           this.transactionsList = res;
//           this.groupTransactions();
//         },
//         error => {
//           console.error('Error fetching data:', error);
//         }
//       );
//   }

//   groupTransactions() {
//     this.groupedTransactions = {};

//     for (const details of this.transactionsList) {
//       const date = details.transactionDate.slice(0, 10);

//       if (!this.groupedTransactions[date]) {
//         this.groupedTransactions[date] = [];
//       }

//       this.groupedTransactions[date].push(details);
//     }

//     this.sortedDateKeys = Object.keys(this.groupedTransactions).sort((a, b) => {
//       return new Date(b).getTime() - new Date(a).getTime();
//     });
//   }

//   applyFilter(event: MatDatepickerInputEvent<Date | null>) {
//     if (event.value !== null) {
//       this.selectedDate = event.value;
//       this.filterTransactionsByDate(this.selectedDate);
//     } else {
//       this.selectedDate = null;
//       this.filteredGroupedTransactions = this.groupedTransactions; // Initialize with original data
//       this.sortedFilteredDateKeys = this.sortedDateKeys; // Initialize with original data
//     }
//   }

//   filterTransactionsByDate(selectedDate: Date) {
//     const selectedDateStr = selectedDate.toISOString().slice(0, 10);

//     this.filteredTransactions = this.transactionsList.filter((details: Transaction) =>
//       details.transactionDate.startsWith(selectedDateStr)
//     );

//     this.groupFilteredTransactions();
//   }

//   groupFilteredTransactions() {
//     this.filteredGroupedTransactions = {};

//     for (const details of this.filteredTransactions) {
//       const date = details.transactionDate.slice(0, 10);

//       if (!this.filteredGroupedTransactions[date]) {
//         this.filteredGroupedTransactions[date] = [];
//       }

//       this.filteredGroupedTransactions[date].push(details);
//     }

//     this.sortedFilteredDateKeys = Object.keys(this.filteredGroupedTransactions).sort(
//       (a, b) => new Date(b).getTime() - new Date(a).getTime()
//     );
//   }
// }