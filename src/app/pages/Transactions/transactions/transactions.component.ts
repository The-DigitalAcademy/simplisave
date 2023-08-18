import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Transaction } from 'src/app/interfaces/transactions.model';
import { TransactionsService } from 'src/app/services/transactions.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {


  transactionsList: any;
  groupedTransactions: any = {}; // Grouped transactions
  sortedDateKeys: string[] = []; // Declare sortedDateKeys property selectedDate: Date | null = null;
  selectedDate: string | null = null;
  searchForm: FormGroup = new FormGroup({});
  displayedTransactions: Transaction[] = [];

    constructor(private transactionService: TransactionsService, private http: HttpClient, private formBuilder: FormBuilder){
      this.searchForm = this.formBuilder.group({
        selectedDate: [null],
      });
    }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    // this.fetchDataFromAPI();
    // this.getCurrentBalance();
   
  }

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList().subscribe(
      (res: Transaction[]) => {
        console.log('API Response:', res);
        this.transactionsList = res; // Assign the response array directly
        this.groupTransactions();
      },
      (error) => {
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
    console.log('selected date', this.selectedDate);

    // Sort the keys in reverse chronological order
    this.sortedDateKeys = Object.keys(this.groupedTransactions).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }

  // This function is called when a date is selected from the date picker
  handleDateSelection(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {

      const selectedDate = format(event.value, 'yyyy-MM-dd'); // Format the selected date in this format
      this.selectedDate = selectedDate;
  console.log('selected displayed date: ' + this.selectedDate)
      
  // Filter data based on selected date
      this.displayedTransactions = this.transactionsList.filter(
        (transaction: Transaction) =>
           // Format the transaction date in 'yyyy-MM-dd' format and compare with selected date
          format(new Date(transaction.transactionDate), 'yyyy-MM-dd') === this.selectedDate
      );
    } else {
      // If no date is selected, reset the selectedDate and show all transactions
      this.selectedDate = null;
      this.displayedTransactions = this.transactionsList; // Show all data
    }
  }
  
  
   
}



//   filterSelection(c: string): void {
//     let x: HTMLCollectionOf<Element>;
//     let i: number;
//     x = document.getElementsByClassName("filterDiv");
//     if (c == "all") c = "";
//     // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
//     for (i = 0; i < x.length; i++) {
//         this.w3RemoveClass(x[i], "show");
//         if (x[i].className.indexOf(c) > -1) this.w3AddClass(x[i], "show");
//     }
// }

// // Show filtered elements
// w3AddClass(element: Element, name: string): void {
//     let i: number;
//     let arr1: string[];
//     let arr2: string[];
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (i = 0; i < arr2.length; i++) {
//         if (arr1.indexOf(arr2[i]) == -1) {
//             element.className += " " + arr2[i];
//         }
//     }
// }

// // Hide elements that are not selected
// w3RemoveClass(element: Element, name: string): void {
//     let i: number;
//     let arr1: string[];
//     let arr2: string[];
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (i = 0; i < arr2.length; i++) {
//         while (arr1.indexOf(arr2[i]) > -1) {
//             arr1.splice(arr1.indexOf(arr2[i]), 1);
//         }
//     }
//     element.className = arr1.join(" ");
// }

// /*####################### Filter Suche ####################################### */

// searchFunction(): void {
//     // Declare variables
//     let input: HTMLInputElement, filter: string, list: HTMLCollectionOf<Element>, i: number;
//     input = document.getElementById('searchinput') as HTMLInputElement;
//     filter = input.value.toUpperCase();
//     list = document.getElementsByClassName('content');
//     // Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < list.length; i++) {
//         if (list[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//             (list[i].parentElement!.parentElement as HTMLElement).style.display = "";
//         } else {
//             (list[i].parentElement!.parentElement as HTMLElement).style.display = "none";
//         }
//     }
//     const close = document.getElementsByClassName("closebtn");
//     for (let i = 0; i < close.length; i++) {
//         const closeButton = close[i] as HTMLElement;
//         closeButton.onclick = function(event) {
//             const div = (event.target as HTMLElement).parentElement as HTMLElement;
//             if (div) {
//                 div.style.opacity = "0";
//                 setTimeout(() => {
//                     if (div.style) {
//                         div.style.display = "none";
//                     }
//                 }, 600);
//             }
//         };
//     }

// }
// }
