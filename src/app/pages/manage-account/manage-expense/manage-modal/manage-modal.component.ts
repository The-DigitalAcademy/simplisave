import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AccountService } from 'src/app/services/account.service';
import { ApiResponse, Budget, BudgetsResponse, CreateTypeRequest, CreateTypeResponse } from 'src/app/interfaces/transactions.model';

interface CategoryOption {
    value: string;
    label: string;
}

@Component({
    selector: 'app-manage-modal',
    templateUrl: './manage-modal.component.html',
    styleUrls: ['./manage-modal.component.css'],
})
export class ManageModalComponent {
    //formData: any = {};
    //selectedCategory = '';
    expenseForm!: FormGroup;
    id!: number;
    Type: Budget[] = [];
    foundBudget: Budget | undefined;
    categoryOptions: CategoryOption[] = [
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
        public dialogRef: MatDialogRef<ManageModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router
    ) {
        this.expenseForm = this.formBuilder.group({
            category: { value: '', disabled: true }, // Disable the form control for the category
            amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
          });
    }

    ngOnInit() {
        this.id = Number(localStorage.getItem('typeId'));

        this.service.getOneBudget().subscribe((res: BudgetsResponse) => {
            if (res) {
                this.Type = res.budgets.filter((record: Budget) => !record.deleted);
               
            }
            console.log('Category to be updated:', this.Type);
            this.foundBudget = this.Type.find((budget: { budgetId: number }) => budget.budgetId == this.id);

            if (this.foundBudget) {

                // Modify this part to set default values in the form
                this.expenseForm.patchValue({// Set category based on foundBudget
                    amount: this.foundBudget.amountSet, // Set amount based on foundBudget
                    category:this.foundBudget.transactionsType,
                   
                });
                 console.log('Category updating:', this.foundBudget.transactionsType)
            } else {
               return;
            }
        });
    }
    //Responsible for closing a modal dialog
    // Lebohang Mokoena
    // 2023/08/10
    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    shouldShowError(controlName: string, errorName: string) {
        const control = this.expenseForm.get(controlName);
        return control?.touched && control?.hasError(errorName);
    }

      /*  This function fetches a ceratin users info and assigns it to the form fields so that they display in the input boxes
      when the form is loaded */

    // Responsible for updating manage page modal
    //Lebohang Mokoena
    // 2023/08/18
    updateExpensePage() {
       

        if (this.expenseForm.valid) {
           
            const updatedData: CreateTypeRequest = {
                amountSet: this.expenseForm.value.amount,
                transactionsType: this.expenseForm.value.category,
               // progressAmount: 0, // Add progressAmount property with an appropriate value
            };
           

            this.service.updateBudget(this.id, updatedData).subscribe(
                (response: CreateTypeResponse) => {
                   
                    this.dialogRef.close();
                    this.refreshManagePage();
                },
                (error) => {
                    console.error('API Error:', error);
                }
            );
        }
    }

    //Responsible for refreshing a page after a successful update
    //Lebohang Mokoena
    // 2023/08/10
    refreshManagePage() {
        this.service.triggerRefresh();
    }
}
