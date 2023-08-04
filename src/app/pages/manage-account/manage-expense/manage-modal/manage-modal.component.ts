/* eslint-disable prettier/prettier */
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.css']
})
export class ManageModalComponent {
  formData: any = {}; // This will store the form data
  expenseForm!: FormGroup; // Add a FormGroup to hold the form controls

  constructor(private dashService:DashboardService,
    private formBuilder: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<ManageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private router: Router
  ) {
    this.expenseForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*')]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get formControls() {
    return this.expenseForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  shouldShowError(controlName: string, errorName: string) {
    const control = this.expenseForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  saveExpense() {
    // Call the API service to post the form data
    if (this.expenseForm.valid) {
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

