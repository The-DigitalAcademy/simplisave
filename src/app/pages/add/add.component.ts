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

  addTransaction!: FormGroup; 
  types: TransactionType[] = [];
  typeExistsError: boolean = false;
  formSubmitted = false;
  selectedType: string = '';
  transactionTypes: string[] = [];
  addData: AddData = { type: '', description: '', amount: null };
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
    private router: Router){}

  ngOnInit() {
    // Define form fields form and validation requirements
    this.addTransaction = this.formBuilder.group({
      type: [
        this.selectedType,
          Validators.required
        
      ],
      description: [
        '',
        [
          Validators.required
        ],
      ],
      amount: [
        '',
        [
          Validators.required
        ],
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
    const control = this.addTransaction.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  // Add this method to handle form submission
  add() {
    // Set formSubmitted to true when the form is submitted
    this.formSubmitted = true;
   
    // Call your saveExpense method or perform other form submission logic
    this.saveExpense();
  }

  saveExpense() {
    if (this.addTransaction.valid) {
      const selectedType = this.addTransaction.value.type;
      const description = this.addTransaction.value.description;
      const amount = parseFloat(this.addTransaction.value.amount);
 
      // Check if the category already exists
      if (this.isTypeAlreadyExists(selectedType)) {
        // Set the error flag to true or display an error message as needed
        this.errorAlert();
        this.typeExistsError = true;
        return;
      }
 
      // Check if the amount is not a number or is negative
      if (this.addTransaction.get('amount')?.value === '' || isNaN(amount) || amount < 0) {
        // Set an error for the "amount" field
        this.addTransaction.get('amount')?.setErrors({ 'invalidAmount': true });
        return;
      }
     
 
      // If the category doesn't exist and the amount is valid, proceed with the API call
      const updatedData = {
        amountSet: amount,
        transactionsType: selectedType,
        selectedDescription: description
      };
 
      this.service.createType(updatedData).subscribe(
        (response: CreateTypeResponse) => {
          this.successAlert();
          this.refreshChecklist();
        },
        (error: CreateTypeResponse) => {
          // Handle API errors if necessary
          this.errorAlert();
        }
      );
    }
  }

  isTypeAlreadyExists(type: string): boolean {
    const lowercaseCategory = type.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    return this.transactionTypes.some(existingCategory => existingCategory.toLowerCase() === lowercaseCategory);
  }

  refreshChecklist() {
    this.dashService.triggerRefresh();
  }

  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Transaction Added Successfully',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    }).then(() => {
      // Navigate to the dashboard 
      this.router.navigate(['/dashboard']);
     })
  }

  errorAlert() {
    Swal.fire({
      icon: 'error',
      text: 'Type Already Exists',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    });
  }
  

}
