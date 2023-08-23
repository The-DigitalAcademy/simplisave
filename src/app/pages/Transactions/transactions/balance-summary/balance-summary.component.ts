import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-balance-summary',
  templateUrl: './balance-summary.component.html',
  styleUrls: ['./balance-summary.component.css']
})
export class BalanceSummaryComponent implements OnInit{
  transactionsList: any[] = []; // Store your transactions here
  totalIncome: number = 0; // Total income for the specific month
  totalExpenses: number = 0; // Total expenses (money out) for the specific month
  availableBalance: number = 0; // Current balance calculated as totalIncome - totalExpenses
  currentBalance: any;

 


  constructor(private http: HttpClient, private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.fetchDataFromAPI();
    this.getCurrentBalance();
  }

  fetchDataFromAPI() {
    this.transactionService.getTransactionsList()
      .subscribe(
        res => {
          this.transactionsList = res;
          // this.calculateTotalsForMonth('08'); // Call the method with the desired month
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
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

  // calculateTotalsForMonth(month: string) {
  //   const filteredTransactions = this.transactionsList.filter(transaction =>
  //     transaction.transactionDate.includes(`-${month}-`)
  //   );

  //   const totalIncome = filteredTransactions.reduce((total, transaction) =>
  //     total + transaction.moneyIn, 0);

  //   const totalExpenses = filteredTransactions.reduce((total, transaction) =>
  //     total + transaction.moneyOut, 0);

  //   this.totalIncome = totalIncome;
  //   this.totalExpenses = totalExpenses;
  //   this.calculateCurrentBalance();
  // }

  // calculateCurrentBalance() {
  //   this.currentBalance = this.totalIncome - this.totalExpenses;
  // }



  /* calculateTotalIncome(): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
 
    let totalIncome = 0;
 
    for (const details of this.transactionsList) {
      const transactionDate = new Date(details.transactionDate);
      const transactionYear = transactionDate.getFullYear();
      const transactionMonth = transactionDate.getMonth();
 
      if (transactionYear === currentYear && transactionMonth === currentMonth) {
        totalIncome += details.moneyIn;
      }
    }
 
    return totalIncome;
  }*/

 
}

