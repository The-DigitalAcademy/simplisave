import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseModalComponent } from '../../expense/expense-modal/expense-modal.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { GoalSavingsData, MostRecentGoal, Profile, TransferData } from 'src/app/interfaces/transactions.model';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.css']
})
export class TransferModalComponent {
  transferForm: FormGroup;
  goalId: number | null = null;
  amountSet!: number;
  items: Profile | null = null;
  isGoalSet!: boolean; // Ensure this is initialized as false
  description!: string;
  mostRecentGoal: MostRecentGoal | null = null;
  goals: GoalSavingsData[] = [];

  constructor(
    private authService: AuthService,
    private dashService: DashboardService,
    private fb: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
 private router: Router
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

  }

  ngOnInit() {
 this.getAccountData();

    this.accountService.refreshObservable.subscribe(() => {
            this.refreshComponent();
    });

    //added 20 sep 2023 delphias
    // this.goalId = this.data.goalId;
    // this.amountSet = this.data.amountSet;
  }



  getAccountData() {
    this.accountService.getAccountData().subscribe((res: Profile) => {
      this.items = res;
      console.log('Getting account data from transfer modal', this.items);
      if (this.items.accounts[0].savingsAccount.goalSavings.length > 0) {
        this.amountSet =
          this.items.accounts[0].savingsAccount.goalSavings[this.items.accounts[0].savingsAccount.goalSavings.length - 1].amountSet;
        this.goals = this.items.accounts[0].savingsAccount.goalSavings;
        this.goalId = this.findMostRecentGoal();
    console.log('Amount set in transfer modal: ', this.amountSet);
      } else {
        this.isGoalSet = false;
}
    });

}



 

  transfer() {
    console.log('Goal ID:', this.goalId);
    if (this.transferForm.valid && this.goalId !== null) {
      // Handle form submission
      const amount: TransferData = {
        amount: this.transferForm.value.amount,
      };
      this.accountService.transferToSavings(this.goalId, amount)
        .subscribe(res => {
          this.dialogRef.close();
          this.authService.successfulMoneyTransfer();
        });

    }
  }

  findMostRecentGoal(): number | null {
    this.mostRecentGoal = null;
    let mostRecentDate = null;
    for (const record of this.goals) {
      const dateStr = record.dateCreated;
      if (dateStr) {
        const dateCreated = new Date(dateStr);
        if (!mostRecentDate || dateCreated > mostRecentDate) {
          mostRecentDate = dateCreated;
          this.mostRecentGoal = record.goalId;
        }
      }
    }

    console.log(this.mostRecentGoal);

    // Check if a most recent amount is set
    if (this.mostRecentGoal !== null && this.amountSet > 0) {
      this.isGoalSet = true;
    } else {
      this.isGoalSet = false;
    }
    return this.mostRecentGoal;
  }

  onNoClick(event: Event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  refresh() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }

   private refreshComponent() {
        location.reload();
    }
}