import { StateService } from 'src/app/services/state.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-goal-modal',
    templateUrl: './goal-modal.component.html',
    styleUrls: ['./goal-modal.component.css'],
})
export class GoalModalComponent {
    formData: any = {}; // This will store the form data
    goalForm!: FormGroup; // Add a FormGroup to hold the form controls
    id: any;
    mostRecentGoal:any;
    items:any;
    goals:any;

    constructor(
        private formBuilder: FormBuilder,
        private service: AccountService,
        public dialogRef: MatDialogRef<GoalModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private stateService:StateService
    ) {
        this.goalForm = this.formBuilder.group({
            amount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        });
    }

    ngOnInit() {
        this.id = localStorage.getItem('typeId');

    }

    get formControls() {
        return this.goalForm.controls;
    }
    //Responsible for closing a modal dialog
    //Lebohang Mokoena
    //2023/08/18
    onNoClick(): void {
        this.dialogRef.close();
    }

    shouldShowError(controlName: string, errorName: string) {
        const control = this.goalForm.get(controlName);
        return control?.touched && control?.hasError(errorName);
    }

    // create the saving goal then saves a modal dialog
    //Lebohang Mokoena
    // 2023/09/04
    createGoalSaving() {
        //Call the API service to post the form data
        if (this.goalForm.valid) {
            const updatedData = {
                ...this.data,
                amountSet: this.formData.amountSet,
                description: 'plusGoal',
            };
            this.service.createSavingGoal(updatedData).subscribe(
                response => {
                    this.getAccountData();
                    this.dialogRef.close();
                },
                error => {
                    //Handle the API errors if necessary
                    console.log('API error', error);
                }
            );
        }
    }

    //Responsible for refreshing a made after a successful save
    //Lebohang Mokoena
    //2023/08/18
    refreshManagePage() {
        this.service.triggerRefresh();
    }

    getAccountData(){
        this.service.getAccountData().subscribe(res => {
            this.items = res;
            console.log(this.items)
            if(this.items.accounts[0].savingsAccount.goalSavings[this.items.accounts[0].savingsAccount.goalSavings.length-1]){
                this.goals=this.items.accounts[0].savingsAccount.goalSavings;
              }else{return}
              this.refreshGoal();
        });
    }

    refreshGoal(){
     
       let mostRecentDate = null;
     
       for (const record of this.goals) {
         const dateStr = record.dateCreated;
         const amountSet = record.amountSet;
         console.log(amountSet)
     
         if (dateStr) {
           const dateCreated = new Date(dateStr);
           if (!mostRecentDate || dateCreated > mostRecentDate) {
             mostRecentDate = dateCreated;
             this.mostRecentGoal = record;
             console.log(this.mostRecentGoal);
           }
           
         }
       }
        this.stateService.updateGoal(this.mostRecentGoal);
    }
}
