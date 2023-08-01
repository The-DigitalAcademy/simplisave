import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart,ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {
  chart!: Chart; // Add the "!" symbol to indicate it will be initialized later
  // constructor(private route: ActivatedRoute,private service:DashboardService, private router: Router) {}

  
  // items1: any = [];
  // data: any;
  // filteredData: any[] = []; // Initialize filteredData as an empty array
  // sumMoneyOut: any;
  
  // ngOnInit() {
  //   this.createChart();
  //   this.getDataFromApi();
  // }
  
  // getDataFromApi() {
  //   this.service.getTransactions()
  //     .subscribe(res => {
  //       this.items1 = res;
  //       console.log(this.items1);
  //       this.filterData();
  //     });
  // }
  
  // filterData() {
  //   // Step 1: Parse the date strings in the JSON data to JavaScript Date objects
  //   const transactions = this.items1.map((record: any) => ({
  //     ...record,
  //     Transaction_Date: new Date(record.Transaction_Date)
  //   }));
  
  //   // Step 2: Get the current month and year
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)
  
  //   // Step 3: Filter records where Money_Out is greater than 0 and Transaction_Date is within the current month
  //   this.filteredData = transactions.filter((record: any) => {
  //     const isMoneyOutPositive = record.Money_Out > 0;
  //     const transactionDate = record.Transaction_Date;
  //     const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
  
  //     return isMoneyOutPositive && isWithinCurrentMonth;
  //   });
  
  //   // Step 4: Calculate the sum of Money_Out for the filtered records
  //   this.sumMoneyOut = this.filteredData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
  //   console.log(this.sumMoneyOut);
  
  //   // Step 5: Log the filtered data
  //   console.log(this.filteredData);
  // }

  createChart() {
    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (!ctx) {
      throw new Error("Canvas context is null.");
    }

    this.chart = new Chart(ctx, {
      type: 'bar', // Change to 'bar' for a bar graph
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
          label: 'Expense Summary', // Add the heading "Expense Summary"
          data: [1300, 1500, 1100, 1500, 1000, 1000, 1200, 1800, 1700, 1200],
          backgroundColor: '#870A3C', // Set the bars' color to #870A3C
          borderWidth: 0 // Remove the borders between the bars
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
              display: false // Remove the grid from the chart
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      } as ChartOptions // Add this type assertion to prevent TypeScript errors
    });
  }

}
