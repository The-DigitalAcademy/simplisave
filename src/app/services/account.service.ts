/* eslint-disable prettier/prettier */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient) { }

  getAccountData() {
    return this.http.get('http://localhost:3000/Account');
   
  }

  getTransactions(){
    return this.http.get('http://localhost:3000/Transaction');
   }


  getSimplisaveData(){
    return this.http.get('http://localhost:3000/Simpil_Savings_Account')
  }
}
