/*
|----------------------------------------------------------------------------------------------------------------------
| TRANSACTIONMODEL                                                                       Created By Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date: 2023-Aug-14
|  Transaction model defines the structure of various data objects within an application. These interfaces are utilized 
|  to ensure type safety and consistency when working with data throughout the application.
|----------------------------------------------------------------------------------------------------------------------
*/


/*
|----------------------------------------------------------------------------------------------------------------------                                                   
|   An interface that represents an object for Login and Admin Login Components                                               Date: 04-Sep-2023 
|----------------------------------------------------------------------------------------------------------------------
*/

export interface LoginData {
  username: string;
  password: string;
}


export interface AddData{
  transactionType: string;
  description: string;
  amount: number | null;
  availableBalance: string;
}


export interface TokenResponse {
  token: string;
}


/*
|----------------------------------------------------------------------------------------------------------------------                                                   
|   An interface that represents an object for the NavBar component.                                                           Created Date: 05-Sep-2023 
|----------------------------------------------------------------------------------------------------------------------
*/

export interface NavbarData {
  name: string;
}


/*
|----------------------------------------------------------------------------------------------------------------------
| PROFILE INTERFACE                                                              Created By: Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Aug-14
|  This interface that defines data structure for user profile information including user details, account details, 
|  transaction history, and savings account details. It is used to represent user profiles in the application.
|----------------------------------------------------------------------------------------------------------------------
*/


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
      goalSavings: GoalSavingsData[];
      savingsAccountNumber: string;
    };
    deleted: boolean;
  }[];
  idNo: string;
  imageUrl: string | null;
}


/*
|--------------------------------------------------------------------------------------------------------------------
| TRANSACTION INTERFACE                                                              Created By: Sekhukhune Delphia
|--------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Aug
|  This interface represents a single transaction object for the following components: account.service, Balance-Summary,
|  Expense, Manage-expense, Top-part, Transaction-Details and Transaction-Service
|--------------------------------------------------------------------------------------------------------------------
*/


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


/*
|---------------------------------------------------------------------------------------------------------------------
| TRANSACTION-DETAILS INTERFACE                                                       Created By: Sekhukhune Delphia
|---------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-01
|  This interface defines a structure for grouping transactions by date for this component.
|---------------------------------------------------------------------------------------------------------------------
*/


export interface GroupedTransactions {
  [date: string]: Transaction[];

}


/*
|-----------------------------------------------------------------------------------------------------------------------
| TRANSFER-MODAL INTERFACE                                                                Created By: Sekhukhune Delphia
|------------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-05
|  Option interface is used to define the structure of an object that represent options of categories for selection 
|  whereas TypeTotals interface is used to store the total of a particular transaction type in this object. This objects 
|  are utilized in the following components: Expense, Expense-Modal and Manage-Expense
|----------------------------------------------------------------------------------------------------------------------
*/


export interface TypeTotals {
  [key: string]: number;
}

//  It'
export interface CategoryOption {
  value: string;
  label: string;
}



/*
|----------------------------------------------------------------------------------------------------------------------
| TRANSFER-MODAL INTERFACE                                                                      Created By: Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-15
|  This TransferData interface is used to describe an object utilized for transferring money to a savings account in the 
|  Transfer-Modal component and the MostRecentGoal is a type used to retrieve the most recent goal set.
|----------------------------------------------------------------------------------------------------------------------
*/


export interface TransferData {
  amount: number;
}

export type MostRecentGoal = number;


/*
|----------------------------------------------------------------------------------------------------------------------
| BUDGET INTERFACE                                                                      Created By: Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-16
|  This interface epresents a data structure related to budget information for the following components: Expense, 
|  Manage-Expense and Manage-Modal. The Budgetsresponse contain an array of Budget objects, which is another interface 
|  that describes the structure of budget-related information.
|----------------------------------------------------------------------------------------------------------------------
*/


export interface Budget {
  amountSet: number;
  budgetCreated: string;
  budgetId: number;
  budgetStatus: string;
  deleted: boolean;
  progress: string;
  progressAmount: number;
  transactionsType: string;
}


export interface BudgetsResponse {
  budgets: Budget[];
}


/*
|----------------------------------------------------------------------------------------------------------------------
| APIRESPOSNE & TRANSACTIONTYPE INTERFACE                                                                      Created By: Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-17
|  This interface is used to describe the structure of an API response object for the following components: Expense, 
|  Manage-Expense, Expense-Modal, and Manage-Modal. TransactionType interface is used to define the structure of objects 
|  representing transaction types.
|----------------------------------------------------------------------------------------------------------------------
*/


export interface ApiResponse {
  budgets: Budget[];
  message: string;
  status: number;
}


export interface TransactionType {
  goalId: number;
  name: string;
  amount: number;
  transactionsType: string;
}


export interface AddTransaction{
  transactionType: string;
  description: string;
  amount: number | null;
  availableBalance: string;
}

/*
|----------------------------------------------------------------------------------------------------------------------
| GOAL INTERFACE                                                                      Created By: Sekhukhune Delphia
|----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-18
|  SavingGoalData Interface is used for adding a new goal or incrementing an existing goal in Manage-Expense and Goal-
|  Modal whereas SavingsGoal and GoalSavingsData are used to ensure that the data you receive from API responses 
| (Profile and SavingGoalData) matches the expected structures, providing type safety  
|----------------------------------------------------------------------------------------------------------------------
*/


export interface SavingGoalData {
  amountSet: number;
  description: string;
}

export interface SavingsGoal {
  goalId: number;
  amountSet: number;
  currentSaved: number;
  description: string;
  dateCreated: string;
}


export interface GoalSavingsData {
  goalId: number;
  amountSet: number;
  totalSaved: number;
  currentSaved: number;
  description: string;
  dateCreated: string;
  savingsAccount: string;
  deleteGoalSavings: boolean;
  deleted: boolean;
}


/*
|------------------------------------------------------------------------------------------------------------------------
| GOAL INTERFACE                                                                      Created By: Sekhukhune Delphia
|-----------------------------------------------------------------------------------------------------------------------
|  Date Created: 2023-Sep-19
|  CreateTypeRequest is an interface that defines the structure of objects that are sent as requests when creating or 
|  updating a budget/expense type whereas whereas CreateTypeResponse interface defines the structure of objects received
|  when creating or updating a budget/expense type.
|----------------------------------------------------------------------------------------------------------------------
*/


export interface CreateTypeRequest {
  amountSet: number;
  transactionsType: string;

}


export interface CreateTypeResponse {
  id: number;
  transactionsType: string;
  amountSet: number;
}


export interface ExpenseModalFormData {
  amount: number | null;
  category: string;
}