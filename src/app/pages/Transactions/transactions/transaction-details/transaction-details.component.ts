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

  TransactionDetails: any;

  constructor(private transactionService: TransactionsService, private http:HttpClient) { }

  ngOnInit(): void {

    this.fetchDataFromAPI();

    // Toggle filter dropdown visibility on mobile devices
    $('#filterToggle').on('click', function() {
      $('#filterDropdown').toggle();
    });
  }

  fetchDataFromAPI(): void {
    this.transactionService.getTransactions().subscribe(
      res => {
        
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
