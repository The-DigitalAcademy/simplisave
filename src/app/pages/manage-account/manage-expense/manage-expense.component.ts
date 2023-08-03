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

  constructor(private accountService: AccountService, private dialog: MatDialog) { }

  ngOnInit() {
   this.loadData();
   this.goalSavings();
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
  openExpenseModal(): void {
    const dialogRef = this.dialog.open(ManageModalComponent, {
      width: '450px' // Set the desired width of the modal
    });
  }

  openGoalModal(): void {
    const dialogRef = this.dialog.open(GoalModalComponent, {
      width: '450px' // Set the desired width of the modal
    });
  }

}
