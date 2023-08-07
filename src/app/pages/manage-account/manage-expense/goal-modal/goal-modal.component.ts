/* eslint-disable prettier/prettier */
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-goal-modal',
  templateUrl: './goal-modal.component.html',
  styleUrls: ['./goal-modal.component.css']
})
export class GoalModalComponent {
  formData: any = {}; // This will store the form data
  goalForm!: FormGroup; // Add a FormGroup to hold the form controls

  constructor(private dashService:DashboardService,
    private formBuilder: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<GoalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private router: Router
  ) {
    this.goalForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get formControls() {
    return this.goalForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  shouldShowError(controlName: string, errorName: string) {
    const control = this.goalForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  saveGoal() {
    // Call the API service to post the form data
    if (this.goalForm.valid) {
      this.service.createType(this.formData).subscribe(
        (response) => {
          // Handle the API response as needed
          console.log('API Response:', response);
          // Optionally, you can close the dialog after successful API call
          this.dialogRef.close();
          this.router.navigate(['/manage']);
          this.refreshChecklist();
        },
        (error) => {
          // Handle API errors if necessary
          console.error('API Error:', error);
        }
      );
    }
  }
  
  refreshChecklist() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }
}
