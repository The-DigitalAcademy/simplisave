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
    // image: string;
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





// token.interface.ts
// export interface Token {
//   access_token: string;
//   expires_in: number;
// }



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

// export interface TransactionTypeResponse {
  //   budget: TransactionType[];
// }

//DASHBOARD --> EXPENSE-MODAL-BUDGET CREATION


// DASHBOARD --> EXPENSE COMPONENT
export interface Budget{

    id: number;
    amountSet: number;
    progressAmount: number;
    transactionsType: string;
    progress: string;
}

// MANAGE EXPENSE COMPONENT
export interface TransactionType {
    goalId: number;
    name: string;
    amount: number;
    transactionsType:string;
}

// export interface ExpenseTransaction{
// id: number;
// date: Date;
// description: string;
// }



export interface CurrentBalance {
    [availableBalance: string]: Transaction[]; // Use Transaction[] or whatever type represents your transaction data
}

// interface UpdateGoalData {
//   amount: number;
//   // Add more properties if needed
// }