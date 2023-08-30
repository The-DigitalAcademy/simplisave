/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ManageModalComponent } from './manage-modal/manage-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalModalComponent } from './goal-modal/goal-modal.component';

@Component({
    selector: 'app-manage-expense',
    templateUrl: './manage-expense.component.html',
    styleUrls: ['./manage-expense.component.css'],
})
export class ManageExpenseComponent implements OnInit {
    transactionType: any;
    Goal_Savings: any[] = [];
    items1: any = [];
    data: any;
    isTypesEmpty: any;
    filteredData: any[] = []; // Initialize filteredData as an empty array
    sumMoneyOut: any;
    sumMoneyOutMonths: any[] = [];
    isDataFetched: boolean = false; // Flag to track data fetch completion
    typeTotals: any = {}; // Property to store typeTotals

    constructor(
        private accountService: AccountService,
        private dialog: MatDialog
    ) {}

    private refreshComponent() {
        location.reload();
    }

    ngOnInit() {
        this.loadData();
        this.goalSavings();
        this.getTransactionsFromApi();
        this.getTypes();
        this.accountService.refreshObservable.subscribe(() => {
            this.refreshComponent();
        });
    }

    // Responsible for making an HTTP request to fetch Transaction Types data.
    // Lebohang Mokoena
    // 2023/07/31
    loadData() {
        this.accountService.getTypes().subscribe(account => {
            this.transactionType = account;
        });
    }

    // Responsible for making an HTTP request to fetch goal savings data.
    // Lebohang Mokoena
    // 2023/07/31
    goalSavings() {
        this.accountService.getGoalSavings().subscribe(Amount_Set => {
            this.Goal_Savings = Amount_Set;
        });
    }

    // triggers onclick edit icon
    // Lebohang Mokoena
    // 2023/07/31
    openExpenseModal(id: any): void {
        localStorage.setItem('typeId', id);
        const dialogRef = this.dialog.open(ManageModalComponent, {
            width: '450px', // Set the desired width of the modal
        });
    }

    // Responsible for saving goal modal
    // Lebohang Mokoena
    // 2023/07/31
    openGoalModal(id: any): void {
        localStorage.setItem('typeId', id);
        const dialogRef = this.dialog.open(GoalModalComponent, {
            width: '450px',
        });
    }

    // Function to delete a transaction type
    // Lebohang Mokoena
    // 2023/08/10
    deleteTransactionType(id: any): void {
        this.accountService.deleteTransaction(id).subscribe(
            () => {
                const index = this.transactionType.findIndex(
                    (type: { id: any; }) => type.id === id
                );
                if (index !== -1) {
                    this.transactionType.splice(index, 1);
                }
            },
            error => {
                console.error('Error deleting transaction type:', error);
            }
        );
    }

    /* call http get function in the service to get all the transaction records
  -Mohammed Badat
  - 2023/08/01*/
    getTransactionsFromApi() {
        this.accountService.getTransactions2().subscribe(res => {
            this.items1 = res;
            console.log(this.items1);
            this.checkDataFetched(); // Call checkDataFetched after items1 is populated
        });
    }

    /* call http get function in the service file to fetch the types of expense allocation categories
  set by the user to populqte the checklist
  -Mohammed Badat
  -2023/08/01 */
    getTypes() {
        this.accountService.getTypes().subscribe((res:any) => {
            this.transactionType = res.budgets;
            console.log(this.transactionType);
            if (this.transactionType.length === 0) {
                this.isTypesEmpty = '';
            } else {
                this.isTypesEmpty = 'full';
            }
            this.checkDataFetched(); // Call checkDataFetched after types are populated
        });
    }

    /*  for each user set expense allocation, fiter the transaction records to find records in the current month
  , records with only money going and the description of the transaction should match the name of the expense allocation type, 
  then add the total money out for all these records giving us a sum that is the amount a user has for a certain expense 
  allocation type for the month 
  -Mohammed Badat
  -2023/08/03*/
    calculateTotalForEachType() {
        // Change dates from strings to JavaScript objects
        const transactions = this.items1.map((record: any) => ({
            ...record,
            transactionDate: new Date(record.transactionDate),
        }));

        // Get the current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

        this.typeTotals = {}; // Reset typeTotals before calculating

        this.transactionType.forEach((type: any) => {
            const typeName = type.transactionsType; // Extract typeName correctly from the type object
            const filteredData = transactions.filter((record: any) => {
                const isMoneyOutPositive = record.moneyOut > 0;
                const transactionDate = record.transactionDate;
                const isWithinCurrentMonth =
                    transactionDate.getMonth() === currentMonth;
                const isDescriptionMatching =
                    record.transactionType === typeName;
                console.log(record.moneyOut);

                return (
                    isMoneyOutPositive &&
                    isWithinCurrentMonth &&
                    isDescriptionMatching
                );
            });
            console.log(filteredData);
            const typeTotal = filteredData.reduce(
                (sum: number, record: any) => sum + record.moneyOut,
                0
            );

            this.typeTotals[typeName] = typeTotal; // Store the typeTotal in the typeTotals object
        });

        console.log(this.typeTotals);
    }

    /* check whether both methods fetching data have successfully retreived it
  -Mohammed Badat
  -2023/08/03 */
    checkDataFetched() {
        if (this.items1 && this.transactionType) {
            this.calculateTotalForEachType();
        }
    }

    /* This function takes the calculated total spent for each type and then
    compares the total amount spent to the total amount set by the user to find
    out their progress as a percentage, thus there progress can be displayed as a
    progress bar
  -2023/08/10 */
    getTypeProgress(typeName: string): number {
        const type = this.transactionType.find(
            (t: any) => t.transactionsType === typeName
        );
        if (!type) {
            return 0;
        }

        const typeTotal = this.typeTotals[typeName] || 0;
        const percentage = (typeTotal / type.amountSet) * 100;
        return percentage;
    }
}
