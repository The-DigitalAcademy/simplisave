import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery library

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    // Toggle filter dropdown visibility on mobile devices
    $('#filterToggle').on('click', function() {
      $('#filterDropdown').toggle();
    });
  }

}
