/* eslint-disable prettier/prettier */
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-manage-modal',
  templateUrl: './manage-modal.component.html',
  styleUrls: ['./manage-modal.component.css']
})
export class ManageModalComponent {
  formData: any = {}; // This will store the form data
  expenseForm!: FormGroup; // Add a FormGroup to hold the form controls
  id:any;
  
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
  ngOnInit(){
    this.id=localStorage.getItem('typeId');
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

  updateExpensePage() {
    // Call the API service to post the form data
    if (this.expenseForm.valid) {
      const updatedData = { ...this.data, amount: this.formData.amount, name: this.formData.name };
      this.service.updateGoalSavings(updatedData, this.id).subscribe(
        (response) => {
          // Handle the API response as needed
          console.log('API Response:', response);
          // Optionally, you can close the dialog after successful API call
          this.dialogRef.close();
          this.refreshManagePage();
        },
        (error) => {
          // Handle API errors if necessary
          console.error('API Error:', error);
        }
      );
    }
  }
  
  refreshManagePage() {
    // Trigger the refresh for ComponentTwo
    this.service.triggerRefresh();
  }
  
}

