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
  encapsulation: ViewEncapsulation.None
})
export class ExpenseComponent {
  constructor(
    private dashService: DashboardService,
    private route: ActivatedRoute,
    private service: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  chart!: Chart; // Add the "!" symbol to indicate it will be initialized later
  items1: any = [];
  data: any;
  types: any;
  isTypesEmpty: any;
  filteredData: any[] = []; // Initialize filteredData as an empty array
  sumMoneyOut: any;
  sumMoneyOutMonths: any[] = [];
  isDataFetched: boolean = false; // Flag to track data fetch completion

  ngOnInit() {
    this.getTransactionsFromApi();
    this.getTypes();
    // this.calculateTotalForEachType(); // Remove this call from ngOnInit()

    // Subscribe to the refreshObservable to listen for refresh events
    this.dashService.refreshObservable$.subscribe(() => {
      // Refresh logic for ComponentTwo
      this.refreshComponent();
    });
  }

  getTransactionsFromApi() {
    this.service.getTransactions().subscribe((res) => {
      this.items1 = res;
      console.log(this.items1);
      this.filterAndCalculateSumMoneyOut();
      this.createChart(...this.sumMoneyOutMonths);
      this.checkDataFetched(); // Call checkDataFetched after items1 is populated
    });
  }

  getTypes() {
    this.service.getTypes().subscribe(res => {
      this.types = res;
      console.log(this.types);
      if (this.types.length === 0) {
        this.isTypesEmpty = '';
      } else {
        this.isTypesEmpty = 'full';
      }
      this.checkDataFetched(); // Call checkDataFetched after types are populated
    });
  }

  checkDataFetched() {
    // Check if both items1 and types are populated
    if (this.items1 && this.types) {
      this.calculateTotalForEachType();
    }
  }

  filterAndCalculateSumMoneyOut() {
    // Change dates from strings to JavaScript objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      Transaction_Date: new Date(record.Transaction_Date),
    }));

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    // Filter data to find records where Money_Out is greater than 0 (Expense) and Transaction_Date is within the current month
    this.filteredData = transactions.filter((record: any) => {
      const isMoneyOutPositive = record.Money_Out > 0;
      const transactionDate = record.Transaction_Date;
      const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;

      return isMoneyOutPositive && isWithinCurrentMonth;
    });

    this.sumMoneyOutMonths = Array.from({ length: 4 }, (_, i) => {
      const prevMonth = (currentMonth - i + 12) % 12;
      const filteredPrevMonthData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.Money_Out > 0;
        const transactionDate = record.Transaction_Date;
        const isWithinPrevMonth = transactionDate.getMonth() === prevMonth;
        return isMoneyOutPositive && isWithinPrevMonth;
      });

      return filteredPrevMonthData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
    });

    this.sumMoneyOutMonths.reverse(); // Reverse the array here
    this.sumMoneyOut = this.sumMoneyOutMonths.reduce((sum, monthSum) => sum + monthSum, 0);
  }

  createChart(...sumMoneyOutMonths: number[]) {
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
        labels: [currentMonthName, prev1MonthName, prev2MonthName, prev3MonthName].reverse(),
        datasets: [{
          label: 'Expense Summary',
          data: sumMoneyOutMonths,
          backgroundColor: ['#00A4CCFF', '#28334AFF', '#6A0572', '#870A3C'],
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

  private refreshComponent() {
    location.reload();
    console.log('Component Two is being refreshed!');
  }

  calculateTotalForEachType() {
    // Change dates from strings to JavaScript objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      Transaction_Date: new Date(record.Transaction_Date),
    }));

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    // Calculate the total Money_Out for each type
    const typeTotals: any = {};

    this.types.forEach((type: any) => {
      const typeName = type.name; // Extract typeName correctly from the type object
      const filteredData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.Money_Out > 0;
        const transactionDate = record.Transaction_Date;
        const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
        const isDescriptionMatching = record.Description === typeName;
        console.log(record.Money_Out);

        return isMoneyOutPositive && isWithinCurrentMonth && isDescriptionMatching;
      });
      console.log(filteredData);
      const typeTotal = filteredData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
      
      typeTotals[typeName] = typeTotal;
    });

    console.log(typeTotals);
  }
}
