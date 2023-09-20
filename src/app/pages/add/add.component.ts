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
    {value: 'DEPOSIT', label: 'Deposit'},
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
      // Construct the transactionData object based on the form values
      const transactionData = {
        transactionType: this.addTransactionForm.value.transactionType,
        description: this.addTransactionForm.value.description,
        amount: parseFloat(this.addTransactionForm.value.amount),
        availableBalance: '' // this value is not used but is in the schema
      };
  
      // Call the modified addTransaction method with transactionData
      this.service.addTransaction(transactionData).subscribe(
        (response) => {
          // Handle success by display a success message or navigate to another page
          Swal.fire({
            icon: 'success',
            title: 'Transaction Added Successfully',
            iconColor: '#AF144B',
            confirmButtonColor: '#AF144B'
          }).then(() => {
            // Navigate to the dashboard
            this.router.navigate(['/transactions']);
          });
        },
        (error) => {
          // Handle error by displaying an error message
          Swal.fire({
            icon: 'error',
            text: 'An error occurred',
            iconColor: '#AF144B',
            confirmButtonColor: '#AF144B'
          });
        }
      );
  
      // Reset the form after successful submission
      this.addTransactionForm.reset();
    } 
  }
  

}
