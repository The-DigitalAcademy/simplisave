import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = `${environment.apiUrl}/Transaction_Details`;

  constructor(private http: HttpClient) { }

  getTransactionsList(){
    return this.http.get<any>(`${environment.apiUrl}/Transaction_Details`)
    .pipe(map((res:any) =>{
      return res;
    }))
  }

  getCurrentBalance(){
    return this.http.get<any>(`${environment.apiUrl}/Account`);
}
}
