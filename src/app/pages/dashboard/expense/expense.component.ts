import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/dashboard.service';
import { AccountService } from 'src/app/services/account.service';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
   encapsulation: ViewEncapsulation.None // Set the encapsulation to none
})

export class ExpenseComponent {

  constructor(private route: ActivatedRoute, private service: AccountService, private router: Router, public dialog: MatDialog) {}

  chart!: Chart; // Add the "!" symbol to indicate it will be initialized later
  items1: any = [];
  data: any;
  filteredData: any[] = []; // Initialize filteredData as an empty array
  sumMoneyOut: any;
  sumMoneyOutCurrentMonth: any;
  sumMoneyOutPrev1Month: any;
  sumMoneyOutPrev2Month: any;
  sumMoneyOutPrev3Month: any;

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    this.service.getTransactions()
      .subscribe(res => {
        this.items1 = res;
        console.log(this.items1);
        this.filterData();
        this.createChart(
          this.sumMoneyOutCurrentMonth,
          this.sumMoneyOutPrev1Month,
          this.sumMoneyOutPrev2Month,
          this.sumMoneyOutPrev3Month
        );
      });
  }

  filterData() {
    // Step 1: Parse the date strings in the JSON data to JavaScript Date objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      Transaction_Date: new Date(record.Transaction_Date)
    }));

    // Step 2: Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    // Step 3: Filter records where Money_Out is greater than 0 and Transaction_Date is within the current month
    this.filteredData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;

      return isMoneyOutPositive && isWithinCurrentMonth;
    });

    // Step 4: Calculate the sum of Money_Out for the filtered records of the current month
    this.sumMoneyOutCurrentMonth = this.filteredData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);

    // Step 5: Filter records for the previous three months
    const prev1Month = (currentMonth - 1 + 12) % 12;
    const prev2Month = (currentMonth - 2 + 12) % 12;
    const prev3Month = (currentMonth - 3 + 12) % 12;

    const filteredPrev1MonthData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinPrev1Month = transactionDate.getMonth() === prev1Month;

      return isMoneyOutPositive && isWithinPrev1Month;
    });

    const filteredPrev2MonthData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinPrev2Month = transactionDate.getMonth() === prev2Month;

      return isMoneyOutPositive && isWithinPrev2Month;
    });

    const filteredPrev3MonthData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinPrev3Month = transactionDate.getMonth() === prev3Month;

      return isMoneyOutPositive && isWithinPrev3Month;
    });

    // Step 6: Calculate the sum of Money_Out for the filtered records of the previous three months
    this.sumMoneyOutPrev1Month = filteredPrev1MonthData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
    this.sumMoneyOutPrev2Month = filteredPrev2MonthData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
    this.sumMoneyOutPrev3Month = filteredPrev3MonthData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);

    // Step 7: Calculate the total money spent for the current and previous three months
    this.sumMoneyOut = this.sumMoneyOutCurrentMonth + this.sumMoneyOutPrev1Month + this.sumMoneyOutPrev2Month + this.sumMoneyOutPrev3Month;
  }

  createChart(currentMonthData: number, prev1MonthData: number, prev2MonthData: number, prev3MonthData: number) {
    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!ctx) {
      throw new Error("Canvas context is null.");
    }

    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    const prev1MonthName = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' });
    const prev2MonthName = new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleString('default', { month: 'long' });
    const prev3MonthName = new Date(new Date().setMonth(new Date().getMonth() - 3)).toLocaleString('default', { month: 'long' });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [prev3MonthName, prev2MonthName, prev1MonthName, currentMonthName],
        datasets: [{
          label: 'Months',
          data: [ prev3MonthData, prev2MonthData, prev1MonthData, currentMonthData],
          backgroundColor: ['#AF144B', '#AF144B', '#AF144B', '#AF144B'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 2000,
            ticks: {
              stepSize: 500
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      } as ChartOptions
    });
  }

  openExpenseModal(): void {
    const dialogRef = this.dialog.open(ExpenseModalComponent, {
      width: '450px' // Set the desired width of the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Category Name:', result.categoryName);
        console.log('Amount:', result.amount);
      }
    });
  }
}
