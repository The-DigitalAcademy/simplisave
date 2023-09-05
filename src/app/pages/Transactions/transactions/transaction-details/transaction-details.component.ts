import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { format } from 'date-fns';
import { GroupedTransactions, Transaction } from 'src/app/interfaces/transactions.model';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
})
export class TransactionDetailsComponent implements OnInit {
  transactionsList: Transaction[] = [];
  groupedTransactions: GroupedTransactions = {};
  sortedDateKeys: string[] = [];
  selectedDate: string | null = null;
  searchForm: FormGroup = new FormGroup({});
  displayedTransactions: Transaction[] = [];
  searchFilter: string = '';

  constructor(
    private transactionService: TransactionsService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      selectedDate: [null],
      description: [null],
      amount: [null],
    });
  }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.transactionService.getSearchFilter().subscribe((filter) => {
      this.searchFilter = filter;
      this.filterTable(this.searchFilter);
    });
  }

   /* 
  |------------------------------------------------------------------------------------------------------------
  | Fetches API Data                                                            Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-14
  | This method fetches a list of transactions from an API using the transactionService.
  | After successfully fetching data, it calls calculateTotalsForMonth() method to calculate income and expenses.
  |
  |-------------------------------------------------------------------------------------------------------------
  */

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList().subscribe(
      (res: Transaction[]) => {
        this.transactionsList = res;
        this.groupTransactions();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  /* 
  |------------------------------------------------------------------------------------------------------------
  | Groups transactionsList within a  date                                       Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-16
  | This method groups the transactions in transactionsList by their transaction date. It makes a collection of 
  | groups, where each group represents a date and store all transactions within that group. It filters the 
  | grouped dates to include only those with matching transactions based on the search filter.  It also updates 
  | sortedDateKeys with filtered dates, which are sorted in descending order by date. And finally populates 
  | displayedTransactions with transactions corresponding to filtered dates. 
  |-------------------------------------------------------------------------------------------------------------
  */
  groupTransactions() {
    this.groupedTransactions = {};

    for (const details of this.transactionsList) {
      const date = details.transactionDate.slice(0, 10);

      if (!this.groupedTransactions[date]) {
        this.groupedTransactions[date] = [];
      }

      this.groupedTransactions[date].push(details);
    }

    // Filter grouped dates to include only those that have matching transactions
    const groupedDatesWithMatches = Object.keys(this.groupedTransactions).filter(date => {
      return this.groupedTransactions[date].some((transaction: Transaction) => {
        const descriptionMatch = transaction.description.toLowerCase().includes(this.searchFilter.toLowerCase());
        return descriptionMatch;
      });
    });

    // Update the sortedDateKeys with filtered dates
    this.sortedDateKeys = groupedDatesWithMatches.sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }


  /* 
  |------------------------------------------------------------------------------------------------------------
  | Groups transactionsList within a  date                                       Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-22
  | This method is triggered when a date is selected in the datepicker. It formats the selected date to 
  | 'yyyy-MM-dd' format and updates selectedDate. After it calls filterTable() to filter the displayed
  | transactions based on the selected date. 
  | 
  |-------------------------------------------------------------------------------------------------------------
  */
 

  handleDateSelection(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const selectedDate = format(event.value, 'yyyy-MM-dd');
      this.selectedDate = selectedDate;
      this.filterTable('');
    } else {
      this.selectedDate = null;
      this.filterTable('');
    }
  }


   /* 
  |------------------------------------------------------------------------------------------------------------
  | Groups transactionsList within a  date                                       Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-19
  | This method filters the transactions displayed in the table based on the search filter and/or selected date.
  | If no filter or selected date is provided, it displays all transactions and regroups them by date. If a
  | filter is provided, it filters transactions by amount and if a non-numeric filter is provided, it filters 
  | transactions by description.
  |-------------------------------------------------------------------------------------------------------------
  */
  filterTable(filter: string) {
    if (this.selectedDate !== null || filter !== '') {
      if (!filter) {
        // No filter applied, display all transactions and grouped dates
        this.displayedTransactions = [...this.transactionsList];
        this.groupTransactions();
      } else if (!isNaN(parseFloat(filter))) {
        // Filter by amount
        const amountFilteredTransactions = this.transactionsList.filter((transaction: Transaction) => {
          const amountMatch =
            (transaction.moneyIn.toString().includes(filter) || transaction.moneyOut.toString().includes(filter));
          return amountMatch;
        });

        this.groupedTransactions = {};
        for (const details of amountFilteredTransactions) {
          const date = details.transactionDate.slice(0, 10);
          if (!this.groupedTransactions[date]) {
            this.groupedTransactions[date] = [];
          }
          this.groupedTransactions[date].push(details);
        }

        const groupedDatesWithMatches = Object.keys(this.groupedTransactions).filter(date => {
          return this.groupedTransactions[date].some((transaction: Transaction) => {
            const amountMatch =
              (transaction.moneyIn.toString().includes(filter) || transaction.moneyOut.toString().includes(filter));
            return amountMatch;
          });
        });
        this.sortedDateKeys = groupedDatesWithMatches.sort((a, b) => {
          return new Date(b).getTime() - new Date(a).getTime();
        });

        this.displayedTransactions = [];
        for (const date of this.sortedDateKeys) {
          this.displayedTransactions = this.displayedTransactions.concat(this.groupedTransactions[date]);
        }
      } else {
        // Filter by description
        this.displayedTransactions = this.transactionsList.filter((transaction: Transaction) => {
          const descriptionMatch = transaction.description.toLowerCase().includes(filter.toLowerCase());
          return descriptionMatch;
        });

        this.groupedTransactions = {};
        for (const details of this.displayedTransactions) {
          const date = details.transactionDate.slice(0, 10);
          if (!this.groupedTransactions[date]) {
            this.groupedTransactions[date] = [];
          }
          this.groupedTransactions[date].push(details);
        }

        const groupedDatesWithMatches = Object.keys(this.groupedTransactions).filter(date => {
          return this.groupedTransactions[date].some((transaction: Transaction) => {
            const descriptionMatch = transaction.description.toLowerCase().includes(filter.toLowerCase());
            return descriptionMatch;
          });
        });
        this.sortedDateKeys = groupedDatesWithMatches.sort((a, b) => {
          return new Date(b).getTime() - new Date(a).getTime();
        });
      }
    } else {
      // No filters, display all transactions grouped by date
      this.displayedTransactions = [...this.transactionsList];
      this.groupTransactions();
    }
  }
}





