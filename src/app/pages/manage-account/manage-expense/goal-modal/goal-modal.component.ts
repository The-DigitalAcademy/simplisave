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
            amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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

    // updating the set saving goal then saves a modal dialog
    //Lebohang Mokoena
    // 2023/08/18
    updateGoalSaving() {
        //Call the API service to post the form data
        if (this.goalForm.valid) {
            const updatedData = { ...this.data, amount: this.formData.amount };
            this.service.updateGoalSaving(updatedData, this.id).subscribe(
                response => {
                    //Handle the API response as needed
                    console.log('API response', response);
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
        //Trigger the refresh for component two
        this.service.triggerRefresh();
    }
}
