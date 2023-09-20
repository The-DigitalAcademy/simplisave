import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseModalComponent } from '../../expense/expense-modal/expense-modal.component';
import { AuthService } from 'src/app/services/auth-service.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.css']
})
export class TransferModalComponent {
  transferForm: FormGroup;
  goalId!: number;
  amountSet!: number;
  items:any;
  isGoalSet!: boolean;
  description!:string;
  mostRecentGoal:any;
  goals: any;
  updatedAccountDetails:any;

  constructor(private authService: AuthService, private dashService: DashboardService,
    private fb: FormBuilder,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private stateService:StateService
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

  }

  ngOnInit() {
 this.getAccountData();


  }



  getAccountData() {
    this.accountService.getAccountData().subscribe(res => {
        this.items = res;
        
        if(this.items.accounts[0].savingsAccount.goalSavings[this.items.accounts[0].savingsAccount.goalSavings.length-1]){
        this.amountSet =
            this.items.accounts[0].savingsAccount.goalSavings[this.items.accounts[0].savingsAccount.goalSavings.length-1].amountSet;
            this.goals=this.items.accounts[0].savingsAccount.goalSavings;
            
          }else{return}
          this.findMostRecentGoal();
    });

}



  

  transfer() {
    if (this.transferForm.valid) {
      // Handle form submission
      const amount = {
        amount: this.transferForm.value.amount,
      };
      this.accountService.transferToSavings(this.goalId,amount)
        .subscribe(res => {
          this.refreshAccountDetails();
          this.dialogRef.close();
          this.authService.successfulMoneyTransfer();
        })
    }
  }


  findMostRecentGoal() {
    this.mostRecentGoal = null;
   let mostRecentDate = null;
   for (const record of this.goals) {
     const dateStr = record.dateCreated;

 
     if (dateStr) {
       const dateCreated = new Date(dateStr);
       if (!mostRecentDate || dateCreated > mostRecentDate) {
         mostRecentDate = dateCreated;
         this.mostRecentGoal = record;
       }
     }
   }
   
   this.goalId=this.mostRecentGoal.goalId;
   
   if (this.mostRecentGoal.amountSet>0){
    this.isGoalSet=true;
  }
  else{
    this.isGoalSet=false;
  }
 }

  /*   When the user clicks on the close button of the dialogue box, this method is called and 
    it closes the dialog box
    2023/08/03 */
  onNoClick(): void {
    this.dialogRef.close();
  }



  /* this method updates the state of refresh subject in the service which triggers the cheklist in another component to be refreshed after an item has been 
  saved
  -Mohammed Badat
  2023/08/03 */
  refresh() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }

  refreshAccountDetails(){
    this.accountService.getAccountData().subscribe(res => {
      this.updatedAccountDetails = res;
      console.log(this.items)

  });
    this.stateService.updateAccountDetails(this.updatedAccountDetails);

  }
}
