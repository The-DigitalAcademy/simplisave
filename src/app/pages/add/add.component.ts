import { AddTransaction, Type } from './../../interfaces/transactions.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddData, ApiResponse, CategoryOption, CreateTypeResponse, TransactionType } from 'src/app/interfaces/transactions.model';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

   /* 
  |------------------------------------------------------------------------------------------------------------
  | Adding Transactions                                                         Created By Thilivhali Ravhutulu
  |------------------------------------------------------------------------------------------------------------
  | 2023-Sept-19
  | Created this component to add new transactions for all users.
  |------------------------------------------------------------------------------------------------------------
  */

  addTransactionForm!: FormGroup; 
  types: TransactionType[] = [];
  typeExistsError: boolean = false;
  formSubmitted = false;
  selectedType: string = '';
  transactionTypes: string[] = [];
  addData: AddData = { transactionType: '', description: '', amount: null, availableBalance: ''};
  typeOptions: CategoryOption[] = [
    { value: 'FOOD', label: 'Food' },
    { value: 'ACCOMMODATION', label: 'Accommodation' },
    { value: 'TRANSPORT', label: 'Transport' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'TUITION', label: 'Tuition' },
    { value: 'OTHER', label: 'Other' },
    { value: 'BANK_CHARGES', label: 'Bank Charges' },
    { value: 'WITHDRAWAL', label: 'Withdrawal' }
  ];


  constructor(private formBuilder: FormBuilder, 
    private dashService: DashboardService,
    private service: AccountService, 
    private router: Router){

      this.addTransactionForm = this.formBuilder.group({
        transactionType: ['', Validators.required],
        description: ['', Validators.required],
        amount: ['', Validators.required],
      })

    }

  ngOnInit() {
    // Define form fields form and validation requirements
    this.addTransactionForm = this.formBuilder.group({
      transactionType: [
        this.addData.transactionType,
          Validators.required
        
      ],
      description: [
        this.addData.description,
          Validators.required
      ],
      amount: [
        this.addData.amount,
          Validators.required
      ],
    });
    

    // Fetch data from the API and update transactionTypes
    this.fetchTransactionTypes();
  }

 

  fetchTransactionTypes() {
    this.service.getTypesBackend().subscribe((res: ApiResponse) => {
      this.types = res.budgets.map(budget => {
        return {
          goalId: budget.id, // Adjust this mapping as needed
          name: budget.transactionsType,
          amount: budget.amountSet,
          transactionsType: budget.transactionsType // Add this line to include transactionsType
        };
       
      });
      // Update transactionTypes array
      this.transactionTypes = this.types.map(type => type.transactionsType);
    });
  }


  shouldShowError(controlName: string, errorName: string) {
    const control = this.addTransactionForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  // Add this method to handle form submission
  add() {
    // Set formSubmitted to true when the form is submitted
    this.formSubmitted = true;
    // Call your saveData method or perform other form submission logic
    this.saveData();
  }

  saveData() {
    if (this.addTransactionForm.valid) {
      const selectedType = this.addTransactionForm.value.transactionType;
      const description = this.addTransactionForm.value.description;
      const amount = parseFloat(this.addTransactionForm.value.amount);
 
      // Check if the type already exists
      if (this.isTypeAlreadyExists(selectedType)) {
        // Set the error flag to true or display an error message as needed
        this.errorAlert();
        this.typeExistsError = true;
        return;
      }
 
      // Check if the amount is not a number or is negative
      if (this.addTransactionForm.get('amount')?.value === '' || isNaN(amount) || amount < 0) {
        // Set an error for the "amount" field
        this.addTransactionForm.get('amount')?.setErrors({ 'invalidAmount': true });
        return;
      }

    }

    this.addData = {
      ...this.addData,
      transactionType: this.addTransactionForm.value.transactionType,
      description: this.addTransactionForm.value.description,
      amount: this.addTransactionForm.value.amount,

    }

    this.service.updateData(this.addData);
    this.service.addTransaction();

    this.addTransactionForm.reset();
  }

  isTypeAlreadyExists(transactionType: string): boolean {
    const lowercaseCategory = transactionType.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    return this.transactionTypes.some(existingCategory => existingCategory.toLowerCase() === lowercaseCategory);
  }


  errorAlert() {
    Swal.fire({
      icon: 'error',
      text: 'An error occurred',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }
  

}
