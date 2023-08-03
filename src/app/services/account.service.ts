/* eslint-disable prettier/prettier */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

   getTypes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/Transaction_Type');
   }



  getSimplisaveData(){
    return this.http.get('http://localhost:3000/Simpil_Savings_Account')
  }

  createType(body: any): Observable<any>{
    return this.http.post<any>('http://localhost:3000/Transaction_Type', body);
  }

   
}
