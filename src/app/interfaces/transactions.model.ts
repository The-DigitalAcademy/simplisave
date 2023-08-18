export interface Transaction {
    transactionId: number;
    transactionType: string;
    transactionDate: string;
    description: string;
    moneyIn: number;
    moneyOut: number;
    availableBalance: number;
    image: string;
  }