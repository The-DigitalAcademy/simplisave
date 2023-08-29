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
