import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent {
  categoryName: string = '';
  amount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveExpense(): void {
    // Implement your logic to save the expense here (e.g., call a service to send data to the server).
    console.log('Category Name:', this.categoryName);
    console.log('Amount:', this.amount);
    this.dialogRef.close({ categoryName: this.categoryName, amount: this.amount });
  }

  
}