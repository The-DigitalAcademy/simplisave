import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseModalComponent } from '../../expense/expense-modal/expense-modal.component';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.css']
})
export class TransferModalComponent {
  transferForm: FormGroup;
 
  constructor(private dashService:DashboardService,
    private fb: FormBuilder,
    private service: AccountService,
    public dialogRef: MatDialogRef<ExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private router: Router
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]]
    });

  }

  transfer() {
    if (this.transferForm.valid) {
      // Handle form submission
      console.log(this.transferForm.value.amount)
    }
  }

/*   When the user clicks on the close button of the dialogue box, this method is called and 
  it closes the dialog box
  2023/08/03 */
  onNoClick(): void {
    this.dialogRef.close();
  }



/* this method updates the state of refresh subject in the service which triggers the cheklist in another component to be refreshed after an item has been 
saved
-Mohammed Badat
2023/08/03 */
  refresh() {
    // Trigger the refresh for ComponentTwo
    this.dashService.triggerRefresh();
  }
}
