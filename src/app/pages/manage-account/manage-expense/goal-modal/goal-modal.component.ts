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

    constructor(
        private formBuilder: FormBuilder,
        private service: AccountService,
        public dialogRef: MatDialogRef<GoalModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
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
                    
                    this.dialogRef.close();
                    this.refreshManagePage();
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
}
