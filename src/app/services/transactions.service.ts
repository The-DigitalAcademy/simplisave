import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = `${environment.apiUrl}/Transactions`;

  constructor(private http: HttpClient) { }

  getTransactions(){
    return this.http.get(`${environment.apiUrl}/Transactions`);
  }
}
