/* eslint-disable prettier/prettier */
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit {
  Transaction_Type: any[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getTypes().subscribe((account) => {
      this.Transaction_Type = account;
      // console.log(this.Transaction_Type);
    });
  }

}
