interface AccountInfo {
    accounts: {
      accountBalance: number;
      accountId: number;
      accountNo: string;
      accountType: string;
      deleted: boolean;
      savingsAccount: {
        dateUpdated: string;
        goalSavings: {
          amountSet: number;
          currentSaved: number;
          dateCreated: string;
          deleteGoalSavings: boolean;
          deleted: boolean;
          description: string;
          goalId: number;
          savingsAccount: {
            savingsAccountId: number;
            totalSavings: number;
            dateUpdated: string;
            savingsAccountNumber: string;
          };
        }[];
      };
      transaction: {
        availableBalance: number;
        description: string;
        moneyIn: number;
        moneyOut: number;
        transactionDate: string;
        transactionId: number;
        transactionType: string;
      }[];
      cellphoneNumber: string;
      createdAt: string;
      email: string;
      firstName: string;
      idNo: string;
      imageUrl: string | null;
      lastName: string;
      password: string;
      roles: {
        id: number;
        name: string;
      }[];
      updatedAt: string;
      userId: number;
      username: string;
    }[];
  }
  
  const accountData: AccountInfo = {
    accounts: [
      {
        accountBalance: 1994,
        accountId: 18,
        accountNo: "017985810",
        accountType: "main account",
        deleted: false,
        savingsAccount: {
          dateUpdated: "2023-08-31T17:51:13.323+00:00",
          goalSavings: [
            {
              amountSet: 500,
              currentSaved: 105,
              dateCreated: "2023-08-31T09:41:42.633+00:00",
              deleteGoalSavings: false,
              deleted: false,
              description: "Monthly Goal",
              goalId: 47,
              savingsAccount: {
                savingsAccountId: 17,
                totalSavings: 105,
                dateUpdated: "2023-08-31T17:51:13.323+00:00",
                savingsAccountNumber: "53715114109",
              },
            },
            // Add more goalSavings objects if needed
          ],
        },
        transaction: [
          {
            availableBalance: 3055,
            description: "Transfer to savings",
            moneyIn: 0,
            moneyOut: 5,
            transactionDate: "2023-08-31T13:43:27.191+00:00",
            transactionId: 149,
            transactionType: "TRANSFER",
          },
          // Add more transaction objects if needed
        ],
        cellphoneNumber: "0748291476",
        createdAt: "2023-08-31T09:00:28.146+00:00",
        email: "mukosi@gmail.com",
        firstName: "MU",
        idNo: "6709166330083",
        imageUrl: null,
        lastName: "MUKOSI",
        password: "$2a$10$Ii4yk2pqQKsz1O.xD0QqSujCw0Qwl67CTGOr6tPXyMaeYybIFy5qu",
        roles: [
          {
            id: 1,
            name: "ROLE_STUDENT",
          },
          // Add more roles objects if needed
        ],
        updatedAt: "2023-08-31T09:00:28.146+00:00",
        userId: 18,
        username: "Student",
      },
      // Add more account objects if needed
    ],
  };
  