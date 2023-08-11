import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.css']
})
export class BalanceSummaryComponent implements OnInit{
  currentBalance!: number;
  totalIncome!: number;
  totalExpenses!: number;

  constructor(private http: HttpClient, private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
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
