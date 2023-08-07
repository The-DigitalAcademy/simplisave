/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ManageModalComponent } from './manage-modal/manage-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalModalComponent } from './goal-modal/goal-modal.component';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit {
  Transaction_Type: any[] = [];
  Goal_Savings: any[] = [];
  items1: any = [];
  data: any;
  isTypesEmpty: any;
  filteredData: any[] = []; // Initialize filteredData as an empty array
  sumMoneyOut: any;
  sumMoneyOutMonths: any[] = [];
  isDataFetched: boolean = false; // Flag to track data fetch completion
  typeTotals: any = {}; // Property to store typeTotals

  constructor(private accountService: AccountService, private dialog: MatDialog) { }

  private refreshComponent() {
    location.reload();
  }

  ngOnInit() {
   this.loadData();
   this.goalSavings();
   this.getTransactionsFromApi();
   this.getTypes();
   this.accountService.refreshObservable.subscribe(() => {
    this.refreshComponent();
  });
  }

  // 
  loadData() {
    this.accountService.getTypes().subscribe((account) => {
      this.Transaction_Type = account;

    });
  }

  goalSavings() {
    this.accountService.getGoalSavings().subscribe((Amount_Set) =>{
      this.Goal_Savings = Amount_Set;
    });
  }

  // triggers onclick edit icon
  openExpenseModal(id:any): void {
    localStorage.setItem('typeId',id)
    const dialogRef = this.dialog.open(ManageModalComponent, {
      width: '450px' // Set the desired width of the modal
    });
  }

  openGoalModal(id:any): void {
    localStorage.setItem('typeId',id);
    const dialogRef = this.dialog.open(GoalModalComponent, {
      width: '450px' 
    });
  }

  getTransactionsFromApi() {
    this.accountService.getTransactions().subscribe((res) => {
      this.items1 = res;
      console.log(this.items1);
      this.checkDataFetched(); // Call checkDataFetched after items1 is populated
    });
  }

  getTypes() {
    this.accountService.getTypes().subscribe(res => {
      this.Transaction_Type = res;
      console.log("Types:"+this.Transaction_Type);
      if (this.Transaction_Type.length === 0) {
        this.isTypesEmpty = '';
      } else {
        this.isTypesEmpty = 'full';
      }
      this.checkDataFetched(); // Call checkDataFetched after types are populated
    });
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

    this.typeTotals = {}; // Reset typeTotals before calculating

    this.Transaction_Type.forEach((type: any) => {
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
      
      this.typeTotals[typeName] = typeTotal; // Store the typeTotal in the typeTotals object
    });

    console.log(this.typeTotals);
  }

  checkDataFetched() {
    // Check if both items1 and types are populated
    if (this.items1 && this.Transaction_Type) {
      this.calculateTotalForEachType();
    }
  }

  getTypeProgress(typeName: string): number {
    const type = this.Transaction_Type.find((t: any) => t.name === typeName);
    if (!type) {
      return 0; // Type not found in the types array
    }

    const typeTotal = this.typeTotals[typeName] || 0;
    const percentage = (typeTotal / type.amount) * 100;
    return percentage;
  }

}
