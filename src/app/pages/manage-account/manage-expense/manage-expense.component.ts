import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ManageModalComponent } from './manage-modal/manage-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalModalComponent } from './goal-modal/goal-modal.component';
import { Observable, tap } from 'rxjs';
import { BudgetResponse, TransactionType } from 'src/app/interfaces/transactions.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { StateService } from 'src/app/services/state.service';
import { Chart, ChartOptions } from 'chart.js'; // Import Chart.js
import { ExpenseModalComponent } from '../../dashboard/expense/expense-modal/expense-modal.component';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit{

  transactionType: any;
  Goal_Savings: TransactionType[] = [];
  items1: any = [];
  data: any;
  isTypesEmpty!: string;
  filteredData: any[] = [];
  sumMoneyOut!: number;
  sumMoneyOutMonths: number[] = [];
  isDataFetched: boolean = false;
  typeTotals: any = {};
  items: any;
  amountSet!: number;
  selectedTypeId!: number;
  totalSaved!: number;
  percentageSaved!: number;
  greeting!: string;
  goals: any;
  mostRecentGoal: any;
  description!: string;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private dialog: MatDialog,
    private stateService: StateService
  ) {}

  private refreshComponent() {
    location.reload();
  }

  ngOnInit() {
    // this.loadData();
    this.getAccountData();
    this.getTransactionsFromApi();
    this.getTypes();
    this.accountService.refreshObservable.subscribe(() => {
      this.refreshComponent();
    });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    // Retrieve the previous month from localStorage
    const previousMonth = localStorage.getItem('previousMonth');

    if (previousMonth !== null && +previousMonth !== currentMonth) {
      this.greeting = 'Activated function to set a new empty goal';
      this.newMonthNewGoal();
    } else {
      this.greeting = 'Not a new month';
    }

    this.stateService.categoryList$.subscribe((updatedCategoryList) => {
      this.transactionType = updatedCategoryList;
      this.getAccountData();
      this.calculateTotalForEachType();
    });

    console.log(this.transactionType);

    this.stateService.goal$.subscribe((goal) => {
      this.mostRecentGoal = goal;
      this.amountSet = this.mostRecentGoal.amountSet;
      this.description = this.mostRecentGoal.description;
      this.totalSaved = this.mostRecentGoal.currentSaved;
      console.log(goal);
      this.getAccountData();
      this.calculatePercentageSaved();
    });
  }

  // Responsible for making an HTTP request to fetch Transaction Types data.
  // Lebohang Mokoena
  // 2023/07/31
  /*   loadData() {
        this.accountService.getTypes().subscribe(account => {
            this.transactionType = account;
        });
    } */


  // Responsible for making an HTTP request to fetch goal savings data.
  // Lebohang Mokoena
  // 2023/07/31
  getAccountData() {
    this.accountService.getAccountData().subscribe((res) => {
      this.items = res;
      console.log(this.items.accounts[0].savingsAccount.goalSavings);

      // Check if 'amountSet' is defined before accessing it
      if (
        this.items.accounts &&
        this.items.accounts[0] &&
        this.items.accounts[0].savingsAccount &&
        this.items.accounts[0].savingsAccount.goalSavings &&
        this.items.accounts[0].savingsAccount.goalSavings[0]
      ) {
        this.goals = this.items.accounts[0].savingsAccount.goalSavings;
      } else {
        // Handle the case when 'amountSet' is undefined or empty
        this.amountSet = 0; // You can set it to a default value or handle it as needed
      }
      this.findMostRecentGoal();
    });
  }

  calculatePercentageSaved() {
    if (this.amountSet !== 0) {
      this.percentageSaved = (this.totalSaved / this.amountSet) * 100;
      console.log(`Total Saved as a percentage: ${this.percentageSaved.toFixed(2)}%`);
      if (this.percentageSaved >= 100) {
        console.log("executing increase goal");
        this.increaseGoal();

      }
    } else {
      console.log('Amount set is zero, cannot calculate percentage.');
    }
  }

  openExpenseModal(id: any): void {
    localStorage.setItem('typeId', id);
    const dialogRef = this.dialog.open(ManageModalComponent, {
      width: '450px', // Set the desired width of the modal
    });
  }

  openAddExpenseModal(): void {
    const dialogRef = this.dialog.open(ExpenseModalComponent, {
      width: '450px',
    });
  }

  // Responsible for saving goal modal
  // Lebohang Mokoena
  // 2023/07/31
  openGoalModal(): void {
    const dialogRef = this.dialog.open(GoalModalComponent, {
      width: '450px',
    });
  }

  // Function to delete a transaction type
  // Lebohang Mokoena
  // 2023/08/10
  deleteTransactionType(id: any) {
    this.accountService.deleteTransaction(id).subscribe(
      (res) => {
        this.accountService.getTypesBackend().subscribe(
          (res: any) => {
            this.transactionType = res.budgets.filter((record: any) => !record.deleted);
            this.stateService.updateCategoryList(this.transactionType);
            console.log(this.transactionType);
          },
          (error) => {
            if (error.status === 404) {
              // Handle HTTP error status 404 by emptying the behavior subject
              this.stateService.updateCategoryList([]);
            }
          }
        );
      },
    );
  }

  /* call http get function in the service to get all the transaction records
  -Mohammed Badat
  - 2023/08/01*/

  getTransactionsFromApi() {
    this.accountService.getTransactions2().subscribe((res) => {
      this.items1 = res;

      this.checkDataFetched(); // Call checkDataFetched after items1 is populated
    });
  }
  /* call http get function in the service file to fetch the types of expense allocation categories
       set by the user to populate the checklist
       -Mohammed Badat
       -2023/08/01 
    /* 
    |------------------------------------------------------------------------------------------------------------
    | Added BudgetResponse Interface                                              Modified By Sekhukhune Delphia
    |------------------------------------------------------------------------------------------------------------
    | 2023-Sep-01
    | Added the interface BudgetResponse and checked if the response and 'budget' property are defined.
    | Assign the 'budget' property to the 'transactionType' variable.
    |
    |-------------------------------------------------------------------------------------------------------------
    */

  getTypes() {
    this.accountService.getTypesBackend().subscribe(
      (res: any) => {
        if (res && res.budgets) {
          this.transactionType = res.budgets.filter((record: any) => !record.deleted);
          if (this.transactionType && this.transactionType.length === 0) {
            this.isTypesEmpty = '';
          } else {
            this.isTypesEmpty = 'full';
          }
          this.checkDataFetched();
        }
      },
      (error) => {
        if (error.status === 404) {
          console.log("No budget set yet");
          this.isTypesEmpty = ''
          // You can optionally set this.isTypesEmpty to a specific value here if needed.
        } else {
          console.error("An error occurred:", error);
        }
      }
    );
  }

  /* for each user set expense allocation, fiter the transaction records to find records in the current month
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
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    this.typeTotals = {}; // Reset typeTotals before calculating

    this.transactionType.forEach((type: any) => {
      const typeName = type.transactionsType; // Extract typeName correctly from the type object
      const filteredData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.moneyOut > 0;
        const transactionDate = record.transactionDate;
        const isWithinCurrentMonth =
          transactionDate.getMonth() === currentMonth;
        const isDescriptionMatching =
          record.transactionType === typeName;

        return (
          isMoneyOutPositive &&
          isWithinCurrentMonth &&
          isDescriptionMatching
        );
      });

      const typeTotal = filteredData.reduce(
        (sum: number, record: any) => sum + record.moneyOut,
        0
      );

      this.typeTotals[typeName] = typeTotal; // Store the typeTotal in the typeTotals object
    });
  }

  /* check whether both methods fetching data have successfully retrieved it
  -Mohammed Badat
  -2023/08/03 */
  checkDataFetched() {
    if (this.items1 && this.transactionType) {
      this.calculateTotalForEachType();
    }
  }

  /* This function takes the calculated total spent for each type and then
  compares the total amount spent to the total amount set by the user to find
  out their progress as a percentage, thus there progress can be displayed as a
  progress bar
  -2023/08/10 */
  getTypeProgress(typeName: string): number {
    const type = this.transactionType.find(
      (t: any) => t.transactionsType === typeName
    );
    if (!type) {
      return 0;
    }

    const typeTotal = this.typeTotals[typeName] || 0;
    const percentage = (typeTotal / type.amountSet) * 100;
    return percentage;
  }

  findMostRecentGoal() {
    // Check if this.goals is populated (not empty and not null)
    if (!this.goals || this.goals.length === 0) {
      console.log('No goals are available.');
      return; // Exit the function early if there are no goals
    }
  
    let mostRecentDate = null;
  
    for (const record of this.goals) {
      const dateStr = record.dateCreated;
      const amountSet = record.amountSet;
      console.log(amountSet);
  
      if (dateStr) {
        const dateCreated = new Date(dateStr);
        if (!mostRecentDate || dateCreated > mostRecentDate) {
          mostRecentDate = dateCreated;
          this.mostRecentGoal = record;
        }
      }
    }
  
    this.amountSet = this.mostRecentGoal.amountSet;
    this.description = this.mostRecentGoal.description;
    this.totalSaved = this.mostRecentGoal.currentSaved;
    console.log(this.description + 'HI' + this.amountSet);
    if (this.totalSaved === null) {
      this.totalSaved = 0;
    }
  
    console.log(this.mostRecentGoal);
  
    if (this.amountSet <= 0 && this.description == 'goal') {
      console.log(this.amountSet, "AMOOOOUNT SEET")
      this.authService.addGoal();
    }
    if (this.amountSet <= 0 && this.description == 'plusGoal') {
      console.log(this.amountSet, "AMOOOOUNT SEET")
      this.authService.addNewGoal();
    }
    if (this.amountSet > 0) {
      this.calculatePercentageSaved();
    }
  }
  

  newMonthNewGoal() {
    const updatedData = {
      ...this.data,
      amountSet: 0,
      description: 'goal',
    };
    this.accountService.createSavingGoal(updatedData).subscribe(
      (response) => {
        console.log(response, "added made goal empty")
      },
      (error) => {
        // Handle the API errors if necessary
        console.log('API error', error);
      }
    );
  }

  increaseGoal() {
    const updatedData = {
      ...this.data,
      amountSet: 0,
      description: 'plusGoal',
    };

    this.accountService.createSavingGoal(updatedData).subscribe(
      (response) => {
        this.getAccountData();
        console.log(response, "added made goal empty")
      },
      (error) => {
        // Handle the API errors if necessary
        console.log('API error', error);
      }
    );
  }

}
