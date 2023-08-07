import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent {
  formData: any = {}; // This will store the form data
  expenseForm!: FormGroup; // Add a FormGroup to hold the form controls

  constructor(private dashService:DashboardService,
    private formBuilder: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
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

/*   When the user clicks on the close button of the dialogue box, this method is called and 
  it closes the dialog box
  2023/08/03 */
  onNoClick(): void {
    this.dialogRef.close();
  }

  shouldShowError(controlName: string, errorName: string) {
    const control = this.expenseForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  /* This method calls the post function in the service and sends the expense allocation name and amount set by the user to be stored
  -Mohammed Badat
  -2023/08/03 */
  saveExpense() {
    // Call the API service to post the form data
    if (this.expenseForm.valid) {
      this.service.createType(this.formData).subscribe(
        (response: any) => {
          // Handle the API response as needed
          console.log('API Response:', response);
          // Optionally, you can close the dialog after successful API call
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
          this.refreshChecklist();
        },
        (error: any) => {
          // Handle API errors if necessary
          console.error('API Error:', error);
        }
      );
    }
  }

/* this method updates the state of refresh subject in the service which triggers the cheklist in another component to be refreshed after an item has been 
saved
-Mohammed Badat
2023/08/03 */
  refreshChecklist() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }
}
