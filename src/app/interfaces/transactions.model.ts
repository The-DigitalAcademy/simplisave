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

export interface BudgetResponse {
    budget: Budget[];
}

interface TransactionTypeResponse {
    budget: TransactionType[];
}
export interface Budget {
    id: number;
    amountSet: number;
    progressAmount: number;
    transactionsType: string;
}

export interface TransactionType {
    goalId: number;
    name: string;
    amount: number;
    transactionsType:string;
}

export interface GroupedTransactions {
    [date: string]: Transaction[]; // Use Transaction[] or whatever type represents your transaction data
}

export interface CurrentBalance {
    [availableBalance: string]: Transaction[]; // Use Transaction[] or whatever type represents your transaction data
}
