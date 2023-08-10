/* eslint-disable prettier/prettier */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private refreshSubject = new Subject<void>();

  refreshObservable = this.refreshSubject.asObservable();

  private apiUrl = 'http://localhost:3000/Transaction_Type';
  private url = 'http://localhost:3000/Goal_Savings';

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

  getGoalSavings(): Observable<any[]> {
    return this.http.get<[any]>('http://localhost:3000/Goal_Savings')
  }

  updateGoalSavings(data: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  updateGoalSaving(data: any, id: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteTransaction(id: any): Observable<void> {
    const url = `${this.apiUrl}/transactionTypes/${id}`;
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  triggerRefresh() {
    this.refreshSubject.next();
  }
}
