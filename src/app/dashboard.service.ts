/* eslint-disable prettier/prettier */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }


//   getTransactions(){
//     return this.http.get('http://localhost:3000/Transaction');
//    }
}
