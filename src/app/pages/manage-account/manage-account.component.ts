import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent {

  items1: any = [];
  data: any;
  Transaction_Type: any;
  isTypesEmpty: any;
  filteredData: any[] = []; // Initialize filteredData as an empty array
  sumMoneyOut: any;
  sumMoneyOutMonths: any[] = [];
  isDataFetched: boolean = false; // Flag to track data fetch completion
  typeTotals: any = {}; // Property to store typeTotals

  ngOnInit() {
    this.getTransactionsFromApi();
    this.getTypes();
    // this.calculateTotalForEachType(); // Remove this call from ngOnInit()
  }


    constructor(
      private service: AccountService,
      public dialog: MatDialog
    ) {}


  getTransactionsFromApi() {
    this.service.getTransactions().subscribe((res) => {
      this.items1 = res;
      console.log(this.items1);
      this.checkDataFetched(); // Call checkDataFetched after items1 is populated
    });
  }

  getTypes() {
    this.service.getTypes().subscribe(res => {
      this.Transaction_Type = res;
      console.log("Types:"+this.Transaction_Type);
      if (this.Transaction_Type.length === 0) {
        this.isTypesEmpty = '';
      } else {
        this.isTypesEmpty = 'full';
      }
      this.checkDataFetched(); // Call checkDataFetched after types are populated
    });
  }

  calculateTotalForEachType() {
    // Change dates from strings to JavaScript objects
    const transactions = this.items1.map((record: any) => ({
      ...record,
      Transaction_Date: new Date(record.Transaction_Date),
    }));

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Get the current month (0 to 11)

    this.typeTotals = {}; // Reset typeTotals before calculating

    this.Transaction_Type.forEach((type: any) => {
      const typeName = type.name; // Extract typeName correctly from the type object
      const filteredData = transactions.filter((record: any) => {
        const isMoneyOutPositive = record.Money_Out > 0;
        const transactionDate = record.Transaction_Date;
        const isWithinCurrentMonth = transactionDate.getMonth() === currentMonth;
        const isDescriptionMatching = record.Description === typeName;
        console.log(record.Money_Out);

        return isMoneyOutPositive && isWithinCurrentMonth && isDescriptionMatching;
      });
      console.log(filteredData);
      const typeTotal = filteredData.reduce((sum: number, record: any) => sum + record.Money_Out, 0);
      
      this.typeTotals[typeName] = typeTotal; // Store the typeTotal in the typeTotals object
    });

    console.log(this.typeTotals);
  }

  checkDataFetched() {
    // Check if both items1 and types are populated
    if (this.items1 && this.Transaction_Type) {
      this.calculateTotalForEachType();
    }
  }
  getTypeProgress(typeName: string): number {
    const type = this.Transaction_Type.find((t: any) => t.name === typeName);
    if (!type) {
      return 0; // Type not found in the types array
    }

    const typeTotal = this.typeTotals[typeName] || 0;
    const percentage = (typeTotal / type.amount) * 100;
    return percentage;
  }


}
