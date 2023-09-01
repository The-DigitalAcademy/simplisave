import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';

interface expenseForm {
  category:string;
  amount: number;
}

interface categories {
  label: string;
  value:string;
  
}

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})


export class ExpenseModalComponent {
  formData: expenseForm = {
  category: '',
  amount: 0,
};
  expenseForm!: FormGroup; // Add a FormGroup to hold the form controls
  selectedCategory: string = '';
  categoryOptions: categories[] = [
    { value: 'FOOD', label: 'Food' },
    { value: 'ACCOMMODATION', label: 'Accommodation' },
    { value: 'TRANSPORT', label: 'Transport' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'TUITION', label: 'Tuition' },
    { value: 'OTHER', label: 'Other' },
    { value: 'BANK_CHARGES', label: 'Bank Charges' },
    { value: 'WITHDRAWAL', label: 'Withdrawal' }
  ];

  constructor(private dashService: DashboardService,
    private formBuilder: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router
  ) {
    this.expenseForm = this.formBuilder.group({
      category: [this.selectedCategory, Validators.required],
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
      const updatedData = {
        amountSet: this.expenseForm.value.amount,
        transactionsType: this.expenseForm.value.category
      };
      this.service.createType(updatedData).subscribe(
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

  /* this method updates the state of refresh subject in the service which triggers the checklist in another component to be refreshed after an item has been 
  saved
  -Mohammed Badat
  2023/08/03 */
  refreshChecklist() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }
}
