import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery'; // Import jQuery library
import { TransactionsService } from 'src/app/services/transactions.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transactions.model';
import { format } from 'date-fns';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionsList: any;
  groupedTransactions: any = {}; // Grouped transactions
  sortedDateKeys: string[] = []; // Declare sortedDateKeys property selectedDate: Date | null = null;
  selectedDate: string | null = null;
  searchForm: FormGroup = new FormGroup({});
  displayedTransactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionsService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    // this.searchForm = this.formBuilder.group({
    //   selectedDate: [null],
    //   description: [null],
    //   amount: [null]
    //   });

    this.searchForm = this.formBuilder.group({
      selectedDate: [null],
      description: [null],
      amount: [null],
    });
  }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    // this.getCurrentBalance();

    this.transactionService.getSearchFilter().subscribe(filter => {
      this.filterTable(filter);
    });
  }

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList().subscribe(
      (res: Transaction[]) => {
        console.log('API Response:', res);
        this.transactionsList = res; // Assign the response array directly
        this.groupTransactions();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  groupTransactions() {
    this.groupedTransactions = {};

    // Iterate through each transaction
    for (const details of this.transactionsList) {
      const date = details.transactionDate.slice(0, 10); // Extract date in 'YYYY-MM-DD' format

      // If the date group doesn't exist, create an empty array for it
      if (!this.groupedTransactions[date]) {
        this.groupedTransactions[date] = [];
      }

      // Push the transaction details into the appropriate date group
      this.groupedTransactions[date].push(details);
    }
    console.log('selected transaction date', this.selectedDate);
    console.log('Grouped transaction' + this.groupedTransactions);

    // Sort the keys in reverse chronological order
    this.sortedDateKeys = Object.keys(this.groupedTransactions).sort(
      (a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
      }
    );
  }

    // This function is called when a date is selected from the date picker
    handleDateSelection(event: MatDatepickerInputEvent<Date>) {
        if (event.value) {
            const selectedDate = format(event.value, 'yyyy-MM-dd'); // Format the selected date in this format
            this.selectedDate = selectedDate;
            console.log(
                'selected transaction displayed date: ' + this.selectedDate
            );

            // Filter data based on selected date
            this.displayedTransactions = this.transactionsList.filter(
                (transaction: Transaction) =>
                    // Format the transaction date in 'yyyy-MM-dd' format and compare with selected date
                    format(
                        new Date(transaction.transactionDate),
                        'yyyy-MM-dd'
                    ) === this.selectedDate
            );
        } else {
            // If no date is selected, reset the selectedDate and show all transactions
            this.selectedDate = null;
            this.displayedTransactions = this.transactionsList; // Show all data
        }
        console.log('Displayed Transactions:');
        for (const transaction of this.displayedTransactions) {
            console.log('Date:', transaction.transactionDate);
            console.log('Description:', transaction.description);
            console.log(
                'Amount:',
                transaction.moneyOut
                    ? `- R ${transaction.moneyOut}.00`
                    : `+ R ${transaction.moneyIn}.00`
            );
        }
    }

    applyFilter() {
        const descriptionFilter = this.searchForm.get('description')?.value;

        // Filter data based on selected date
        this.displayedTransactions = this.transactionsList.filter(
            (transaction: Transaction) => {
                const dateMatch =
                    !this.selectedDate ||
                    format(
                        new Date(transaction.transactionDate),
                        'yyyy-MM-dd'
                    ) === this.selectedDate;
                const descriptionMatch =
                    !descriptionFilter ||
                    transaction.description
                        .toLowerCase()
                        .includes(descriptionFilter.toLowerCase());

                return dateMatch && descriptionMatch;
            }
        );

        console.log('Filtered Transactions:');
        for (const transaction of this.displayedTransactions) {
            console.log('Date:', transaction.transactionDate);
            console.log('Description:', transaction.description);
            console.log(
                'Amount:',
                transaction.moneyOut
                    ? `- R ${transaction.moneyOut}.00`
                    : `+ R ${transaction.moneyIn}.00`
            );
        }
    }


  filterTable(filter: string) {
    console.log('Filter:', filter); 
    if (filter) {
      // Filter transactions based on the provided filter
      this.displayedTransactions = this.transactionsList.filter(
        (transaction: Transaction) => {
          const descriptionMatch =
            transaction.description.toLowerCase().includes(filter.toLowerCase());
  
          const amountMatch =
            transaction.moneyIn === parseFloat(filter) || 
            transaction.moneyOut === parseFloat(filter);
  
          return descriptionMatch || amountMatch;
        }
      );
  
      // After filtering transactions, update the sortedDateKeys array to include only the dates that have transactions matching the user's search criteria
      this.sortedDateKeys = Object.keys(this.groupedTransactions).filter(date =>
        this.displayedTransactions.some((transaction: Transaction) => {
          const transactionDate = format(new Date(transaction.transactionDate), 'yyyy-MM-dd'); // Format the date
          return date === transactionDate;
        })
      );
    } else if (this.selectedDate) {
      // If only date is selected, filter transactions based on the selected date
      const selectedDateTransactions = this.transactionsList.filter(
        (transaction: Transaction) =>
          format(new Date(transaction.transactionDate), 'yyyy-MM-dd') === this.selectedDate
      );
      this.displayedTransactions = selectedDateTransactions;
      this.sortedDateKeys = [this.selectedDate];
    } else {
      // If no filter provided, show all transactions and reset the sortedDateKeys array to include all dates
      this.displayedTransactions = this.transactionsList;
      this.sortedDateKeys = Object.keys(this.groupedTransactions).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
      );
    }
  }
  


  
  

  // applySearchFilter(filter: string) {
  //   if (filter) {
  //     // Filter transactions based on description
  //     this.displayedTransactions = this.transactionsList.filter(
  //       (transaction: Transaction) =>
  //         transaction.description.toLowerCase().includes(filter.toLowerCase())
  //     );
  //   } else {
  //     // If no filter provided, show all transactions
  //     this.displayedTransactions = this.transactionsList;
  //   }
  // }

}