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

  export interface GroupedTransactions {
    [date: string]: Transaction[]; // Use Transaction[] or whatever type represents your transaction data
  }