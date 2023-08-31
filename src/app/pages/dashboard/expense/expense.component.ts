import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartOptions } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';
import { ExpenseModalComponent } from './expense-modal/expense-modal.component';
import { ObjectUnsubscribedError } from 'rxjs';

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
  ) { }

  chart!: Chart;
  items1: any = [];
  data: any;
  types: any;
  isTypesEmpty: any;
  filteredData: any[] = [];
  sumMoneyOut: any;
  sumMoneyOutMonths: any[] = [];
  isDataFetched: boolean = false; // Flag to track data fetch completion
  typeTotals: any = {}; // Property to store typeTotals

  progress:any;



  //When the page is loaded, get the transactions records and different expense allocation types
  ngOnInit() {
    this.getTransactionsFromApi();
    this.getTypes();

/*     Subscribe to the observable that holds the state of the checklist, triggering this which
        triggers a refresh of the checklist once an item is saved
        2023/08/03
 */    this.dashService.refreshObservable$.subscribe(() => {
      this.refreshComponent();
    });
  }


  /* call http get function in the service to get all the transaction records
  -Mohammed Badat
  - 2023/08/01*/
  getTransactionsFromApi() {
    this.service.getTransactions2().subscribe((res: any) => {
      this.items1 = res;
      console.log(this.items1);
      this.filterAndCalculateSumMoneyOut();
      this.createChart(...this.sumMoneyOutMonths);
      this.checkDataFetched();
    });
  }

  /* call http get function in the service file to fetch the types of expense allocation categories
  set by the user to populqte the checklist
  -Mohammed Badat
  -2023/08/01 */
  getTypes() {
    this.service.getTypesBackend().subscribe((res: any) => {
      this.types = res.budgets;
      console.log(this.types);
      if (this.types.length === 0) {
        this.isTypesEmpty = '';
      } else {
        this.isTypesEmpty = 'full';
      }
      this.checkDataFetched();
    });
  }

  /* check whether both methods fetching data have successfully retreived it
  -Mohammed Badat
  -2023/08/03 */
  checkDataFetched() {
    if (this.items1 && this.types) {
      this.calculateTotalForEachType();
    }
  }

  /* filter the transaction records for the current and previous three months to find records that occured 
  within that month, the records should have money going out (expenses), lastly the amounts of these records 
  should be added to obtain the total expense amount for that month
  -Mohammed Badat
  -2023/08/02 */
  filterAndCalculateSumMoneyOut() {
    // Change dates from strings to JavaScript objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      transactionDate: new Date(record.transactionDate),
    }));

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    /*    
        this.filteredData = transactions.filter((record: any) => {
          const isMoneyOutPositive = record.Money_Out > 0;
          const transactionDate = record.Transaction_Date;
          const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
    
          return isMoneyOutPositive && isWithinCurrentMonth;
        });
    
     */
    // Filter data to find records where Money_Out is greater than 0 (Expense) and Transaction_Date is within the current month
    this.sumMoneyOutMonths = Array.from({ length: 4 }, (_, i) => {
      
      
      //keep month within the javascript object range (0 to 11)
      const prevMonth = (currentMonth - i + 12) % 12;
      const filteredPrevMonthData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.moneyOut > 0;
        const transactionDate = record.transactionDate;
        const isWithinPrevMonth = transactionDate.getMonth() === prevMonth;
        return isMoneyOutPositive && isWithinPrevMonth;
        
      });
      /* Add the money out amount for each of the transactions that matches the conditions */
      return filteredPrevMonthData.reduce((sum: number, record: any) => sum + record.moneyOut, 0);
    
    });

    this.sumMoneyOutMonths.reverse(); // Reverse the array here
    console.log("sum",this.sumMoneyOutMonths);
    
  }

  //create the chart using chart js, display current and three previous months, use the sumMoneyOut created array to populate values
  //Mohammed Badat
  //2023/08/02
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
          label: 'Monthly expense summary',
          data: sumMoneyOutMonths,
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

  //Modal to add to checklist, we pecify which component modal is in to open it
  openExpenseModal(): void {
    const dialogRef = this.dialog.open(ExpenseModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Category Name:', result.categoryName);
        console.log('Amount:', result.amount);
      }
    });
  }

  //called by above observable when the checklist needs to be refreshed
  private refreshComponent() {
    location.reload();
  }

  /*  for each user set expense allocation, fiter the transaction records to find records in the current month
   , records with only money going and the description of the transaction should match the name of the expense allocation type, 
   then add the total money out for all these records giving us a sum that is the amount a user has for a certain expense 
   allocation type for the month 
   -Mohammed Badat
   -2023/08/03*/
  calculateTotalForEachType() {
    // Change dates from strings to JavaScript objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      transactionDate: new Date(record.transactionDate),
    }));
  
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    this.typeTotals = {};

    this.types.forEach((type: any) => {
      const typeName = type.transactionsType;
      const filteredData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.moneyOut > 0;
        const transactionDate = record.transactionDate;
        const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
        const isDescriptionMatching = record.transactionType === typeName;
        console.log(record.moneyOut);

        return isMoneyOutPositive && isWithinCurrentMonth && isDescriptionMatching;
      });
      console.log(filteredData);
      const typeTotal = filteredData.reduce((sum: number, record: any) => sum + record.moneyOut, 0);

      this.typeTotals[typeName] = typeTotal; // Store the   in the typeTotals object
    });

    console.log("Type Totals1" + this.typeTotals);
    this.compareTypesAndTypeTotals(); // Call the new function to compare types and typeTotals
  }

  /*   compare the total monthly spending amounts for the different transaction types with the expense allocation limits
    set by the user and then indicate on the checklist whether have exceeded their set limits or not
    -Mohammed Badat
    -2023/08/03 */
  compareTypesAndTypeTotals() {
    if (!this.types || !this.typeTotals) {
      return;
    }

    for (const type of this.types) {
      const typeName = type.transactionsType;
      const typeTotal = this.typeTotals[typeName] || 0;
      const typeAmount = type.amountSet || 0;
      console.log(type.transactionsType);
      console.log("Amount spent: " +typeTotal);
      console.log("Amount set: " + typeAmount);

      if (typeTotal > typeAmount) {
        type.progress =  "on/over limit";
      } else {
        type.progress ="under limit";
      }
    }
  }
}
