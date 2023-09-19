/*
|---------------------------------------------------------------------------------------------------------------
|   04-Sep-2023                                                                  Created By: Delphia Sekhukhune
|   An interface  for LOGIN AND ADMINLOGIN -->   
|---------------------------------------------------------------------------------------------------------------
*/
export interface LoginData {
  username: string;
  password: string;
}

export interface AddData{
  type: string;
  description: string;
  amount: number | null;
}

// token-response.model.ts (create a new file for this type definition) LOGIN
export interface TokenResponse {
  access_token: string;
  // Add other properties if necessary
}
//An interface for the navBar 05-Sep-2023
export interface NavbarData {
  name: string;
  // Add other properties if needed
}

export interface AccountData {
  firstName: string;
  // Add other properties if needed
}

// An interface  for Transactions-Details and Balance-Summary--> Added 16-Aug-2023 
export interface Transaction {
    transactionId: number;
    transactionType: string;
    transactionDate: string;
    description: string;
    moneyIn: number;
    moneyOut: number;
    availableBalance: number;
}

export interface TransactionRecord {
  transactionId: number;
  transactionType: string;
  transactionDate: Date;
  description: string;
  moneyIn: number;
  moneyOut: number;
  availableBalance: number;
}

export interface User {
    firstName: string;
    lastName: string;
    cellphoneNumber: string;
    email: string;
    accountNo: string;
    idNo: string;
}

// An interface  for Transaction_Details --> Added 01-Sep-2023 
export interface GroupedTransactions {
  [date: string]: Transaction[]; // Use Transaction[] or whatever type represents your transaction data

}


export interface Profile {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  cellphoneNumber: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  roles: { id: number; name: string }[];
  accounts: {
      accountId: number;
      accountNo: string;
      transaction: {
          transactionId: number;
          transactionType: string;
          transactionDate: string;
          description: string;
          moneyIn: number;
          moneyOut: number;
          availableBalance: number;
          accountId: string;
      }[];
      accountBalance: number;
      student: string;
      accountType: string;
      savingsAccount: {
          savingsAccountId: number;
          totalSavings: number;
          dateUpdated: string;
          account: string;
          goalSavings: {
              goalId: number;
              'Amount Set': number;
              'Amount current saved': number;
              Description: string;
              dateCreated: string;
              savingsAccount: string;
              deleteGoalSavings: boolean;
              deleted: boolean;
          }[];
          savingsAccountNumber: string;
      };
      deleted: boolean;
  }[];
  idNo: string;
  imageUrl: string | null;
}

export interface NavBarAccountData {
  [firstName: string]: User[]; // Use Transaction[] or whatever type represents your transaction data
}


//MANAGE-EXPENSE
export interface BudgetResponse {
    budget: Budget[];
}

export interface ApiResponse {
budgets: Budget[];
message: string;
status: number;
}

// export interface TransactionTypeResponse {
  //   budget: TransactionType[];
// }



// DASHBOARD --> EXPENSE COMPONENT
export interface Budget{

    id: number;
    amountSet: number;
    progressAmount: number;
    transactionsType: string;
    progress: string;
}

// Create an interface for the budget item
export interface BudgetItem {
  budgetId: number;
  amountSet: number;
  transactionsType: string;
  progressAmount: number;
}

// Create an interface for the response from the service
export interface BudgetResponses {
  budgets: BudgetItem[];
}

// MANAGE EXPENSE COMPONENT
export interface TransactionType {
    goalId: number;
    name: string;
    amount: number;
    transactionsType:string;
}




//ADDED on the 15 September 2023 
//interface for transfer modal
export interface TransferFormData {
  amount: number;
}


export interface TypeTotals {
  [key: string]: number;
}


export interface ExpenseModalFormData {
  amount: number | null; // Define the properties and their types as needed
  category: string;
  // Add other properties if your form has more fields
}

export interface CategoryOption {
  value: string;
  label: string;
}



export interface Type {
  // Define the properties of the Type interface
  typeId: number;
  // ... other properties
}

export interface AccountDataResponse {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accounts: Account[];
}

export interface Account {
  accountId: number;
  accountNo: string;
  accountBalance: number;
  accountType: string;
  savingsAccount: SavingsAccount;
  deleted: boolean;
  // ...other properties as needed
}

export interface SavingsAccount {
  savingsAccountId: number;
  totalSavings: number;
  dateUpdated: string;
  goalSavings: GoalSavings[];
  savingsAccountNumber: string;
  // ...other properties as needed
}

export interface GoalSavings {
  goalId: number;
  amountSet: number;
  description: string;
  dateCreated: string;
  savingsAccount: string;
  deleteGoalSavings: boolean;
  deleted: boolean;
}

export interface SavingsGoal {
  goalId: number;
  amountSet: number;
  dateCreated: string; 
  
}

export interface AccountItem {
  accountId: number;
  savingsAccount: {
    goalSavings: SavingsGoal[];
  };
}

export interface CreateTypeRequest {
  amountSet: number;
  transactionsType: string;
}

export interface CreateTypeResponse {
  id: number;
  transactionsType: string;
  amountSet: number;
}

export interface Goal {
  goalId: number;
  amountSet: number;
  currentSaved: number;
  description: string;
  dateCreated: string;
}




