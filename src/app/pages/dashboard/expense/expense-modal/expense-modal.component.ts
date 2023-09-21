import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';
import { TransactionType, ApiResponse, ExpenseModalFormData, CategoryOption, CreateTypeResponse } from 'src/app/interfaces/transactions.model';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent {
  formData: ExpenseModalFormData = { amount: null, category: '' };
  expenseForm!: FormGroup;
  selectedCategory: string = '';
  categoryExistsError: boolean = false;
  types: TransactionType[] = [];
  transactionTypes: string[] = [];
  categoryOptions: CategoryOption[] = [
    { value: 'FOOD', label: 'Food' },
    { value: 'ACCOMMODATION', label: 'Accommodation' },
    { value: 'TRANSPORT', label: 'Transport' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'TUITION', label: 'Tuition' },
    { value: 'OTHER', label: 'Other' },
    { value: 'BANK_CHARGES', label: 'Bank Charges' },
    { value: 'WITHDRAWAL', label: 'Withdrawal' }
  ];
  formSubmitted = false;

  constructor(
    private dashService: DashboardService,
    private formBuilder: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.expenseForm = this.formBuilder.group({
      category: [this.selectedCategory, Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit() {
    // Fetch data from the API and update transactionTypes
    this.fetchTransactionTypes();
  }

  fetchTransactionTypes() {
    this.service.getTypesBackend().subscribe((res: ApiResponse) => {
      this.types = res.budgets.map(budget => {
        return {
          goalId: budget.budgetId,
          name: budget.transactionsType,
          amount: budget.amountSet,
          transactionsType: budget.transactionsType
        };
       
      });
      // Update transactionTypes array
      this.transactionTypes = this.types.map(type => type.transactionsType);
      console.log('Transaction Types:', this.transactionTypes);
    });
  }

  get formControls() {
    return this.expenseForm.controls;
  }

  isCategoryAlreadyExists(category: string): boolean {
    const lowercaseCategory = category.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    return this.transactionTypes.some(existingCategory => existingCategory.toLowerCase() === lowercaseCategory);
  }

  onNoClick(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
    this.dialogRef.close();
  }

 

  shouldShowError(controlName: string, errorName: string) {
    const control = this.expenseForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

 

  saveExpense() {
    if (this.expenseForm.valid) {
      const selectedCategory = this.expenseForm.value.category;
      const amount = parseFloat(this.expenseForm.value.amount);
 
      // Check if the category already exists
      if (this.isCategoryAlreadyExists(selectedCategory)) {
        // Set the error flag to true or display an error message as needed
        console.log('Selected Category:', selectedCategory);
        this.categoryExistsError = true;
        return;
      }
 
      // Check if the amount is not a number or is negative
      if (this.expenseForm.get('amount')?.value === '' || isNaN(amount) || amount < 0) {
        // Set an error for the "amount" field
        this.expenseForm.get('amount')?.setErrors({ 'invalidAmount': true });
        return;
      }
     
 
      // If the category doesn't exist and the amount is valid, proceed with the API call
      const updatedData = {
        amountSet: amount,
        transactionsType: selectedCategory
      };
 
      this.service.createType(updatedData).subscribe(
        (response: CreateTypeResponse) => {
          // Optionally, you can close the dialog after a successful API call
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
          this.refreshChecklist();
        },
        (error: CreateTypeResponse) => {
          // Handle API errors if necessary
          console.error('API Error:', error);
        }
      );
    }
  }
 

 
 
 
  // Add this method to handle form submission
  onSubmit() {
    // Set formSubmitted to true when the form is submitted
    this.formSubmitted = true;
   
    // Call your saveExpense method or perform other form submission logic
    this.saveExpense();
  }

  refreshChecklist() {
    this.dashService.triggerRefresh();
  }
}
