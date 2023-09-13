import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';
import { TransactionType } from 'src/app/interfaces/transactions.model';

@Component({
    selector: 'app-expense-modal',
    templateUrl: './expense-modal.component.html',
    styleUrls: ['./expense-modal.component.css'],
})
export class ExpenseModalComponent {
    formData: any = {};
    expenseForm!: FormGroup;
    selectedCategory = '';
    categoryExistsError = false;
    types: TransactionType[] = [];
    transactionTypes: string[] = [];
    categoryOptions: any = [
        { value: 'FOOD', label: 'Food' },
        { value: 'ACCOMMODATION', label: 'Accommodation' },
        { value: 'TRANSPORT', label: 'Transport' },
        { value: 'BOOKS', label: 'Books' },
        { value: 'TUITION', label: 'Tuition' },
        { value: 'OTHER', label: 'Other' },
        { value: 'BANK_CHARGES', label: 'Bank Charges' },
        { value: 'WITHDRAWAL', label: 'Withdrawal' },
    ];

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
            amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
    }

    ngOnInit() {
        this.isCategoryAlreadyExists('FOOD');
    }

    get formControls() {
        return this.expenseForm.controls;
    }

    isCategoryAlreadyExists(category: string): boolean {
        this.service.getTypesBackend().subscribe((res: any) => {
            this.types = res.budgets;
            console.log(res.budgets);
            for (const transaction of this.types) {
                this.transactionTypes.push(transaction.transactionsType);
                console.log(this.transactionTypes);
            }
        });
        return this.transactionTypes.includes(category);
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
            const selectedCategory = this.expenseForm.value.category;

            // Check if the category already exists
            if (this.isCategoryAlreadyExists(selectedCategory)) {
                // Set the error flag to true
                this.categoryExistsError = true;
                return;
            }

            const updatedData = {
                amountSet: this.expenseForm.value.amount,
                transactionsType: selectedCategory,
            };
            this.categoryExistsError = false;

            if (!this.categoryExistsError) {
                this.service.createType(updatedData).subscribe(
                    (response: any) => {
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
    }

    // Add this method to handle form submission
    onSubmit() {
        this.saveExpense();
    }

    refreshChecklist() {
        this.dashService.triggerRefresh();
    }
}
