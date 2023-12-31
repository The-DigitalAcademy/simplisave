import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../interfaces/transactions.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = `${environment.apiUrl}/Transaction_Details`;

  private searchFilterSubject = new BehaviorSubject<string>('');
  private searchFilter$: Observable<string> = this.searchFilterSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTransactionsList() {
    return this.http.get<Transaction>(`${environment.TRANSACTIONS_URL}`)
      // return this.http.get<any>(`${environment.apiUrl}/Transaction_Details`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  /* 
  |------------------------------------------------------------------------------------------------------------
  | Groups transactionsList within a date                                       Created By Sekhukhune Delphia
  |------------------------------------------------------------------------------------------------------------
  | 2023-Aug-29
  | The method sets the search filter to a specified value and updates the search filter for filtering 
  | transactions. The Get method gets an Observable that provides the current search filter value to receive
  | updates whenever the search filter changes.
  |-------------------------------------------------------------------------------------------------------------
  */

  setSearchFilter(filter: string) {
    this.searchFilterSubject.next(filter);
  }

  getSearchFilter(): Observable<string> {
    return this.searchFilter$;
  }
}
