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

  constructor(private route: ActivatedRoute,private service:DashboardService, private router: Router) {}

  chart!: Chart; // Add the "!" symbol to indicate it will be initialized later
  items1:any[]=[];
  items:any;
  data: any;
  filteredData: any;
  sumMoneyOut: any;
  description:any="Uber";


  


  ngOnInit() {
    this.createChart();
    this.getDataFromApi();
    this.filterData();
  }

  getDataFromApi() {
    this.service.getTransactions()
          .subscribe(res => {
            this.items1 = res;
            this.items=this.items1;
            console.log(this.items1);
            console.log(this.items);
            console.log(this.items.Description)
});
  }

  filterData() {
    // Filter records where Money_Out is greater than 0
this.filteredData = this.items1.filter((record: { Money_Out: any; }) => record.Money_Out > 0);

    // Calculate the sum of Money_Out for the filtered records
    this.sumMoneyOut = this.filteredData.reduce((sum: any, item: { Money_Out: any; }) => sum + item.Money_Out, 0);
    console.log( "HI"+this.filteredData)
  }

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
