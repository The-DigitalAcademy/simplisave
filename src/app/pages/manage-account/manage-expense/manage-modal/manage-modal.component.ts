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
    formData: any = {};
    expenseForm!: FormGroup;
    id: any;
    Type: any;
    selectedCategory = '';
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
            category: [this.selectedCategory, Validators.required],
            amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
    }

    ngOnInit() {
        this.id = localStorage.getItem('typeId');

        this.service.getOneTransaction(this.id).subscribe(res => {
            this.Type = res;
            console.log(this.Type);
        });
    }
    //Responsible for closing a modal dialog
    // Lebohang Mokoena
    // 2023/08/10
    onNoClick(): void {
        this.dialogRef.close();
    }

    shouldShowError(controlName: string, errorName: string) {
        const control = this.expenseForm.get(controlName);
        return control?.touched && control?.hasError(errorName);
    }

    // Responsible for updating manage page modal
    //Lebohang Mokoena
    // 2023/08/18
    updateExpensePage() {
        console.log(this.expenseForm.value.category);

        if (this.expenseForm.valid) {
            const updatedData = {
                amountSet: this.expenseForm.value.amount,
                transactionsType: this.expenseForm.value.category,
                progressAmount: 0,
            };

            this.service.updateBudget(updatedData).subscribe(
                response => {
                    console.log('API Response:', response);
                    this.dialogRef.close();
                    this.refreshManagePage();
                },
                error => {
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
