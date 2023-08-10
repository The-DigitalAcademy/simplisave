import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private refreshSubject = new Subject<void>();

  refreshObservable = this.refreshSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/Transaction_Type`;
  private url = `${environment.apiUrl}/Goal_Savings`;

  constructor(private http: HttpClient) { }

  getAccountData() {
    return this.http.get(`${environment.apiUrl}/Account`);
  }

  getTransactions(){
    return this.http.get(`${environment.apiUrl}/Transaction`);
  }

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/Transaction_Type`);
  }

  getSimplisaveData(){
    return this.http.get(`${environment.apiUrl}/Simpil_Savings_Account`);
  }

  createType(body: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Transaction_Type`, body);
  }

  getGoalSavings(): Observable<any[]> {
    return this.http.get<[any]>(`${environment.apiUrl}/Goal_Savings`);
  }

  updateGoalSavings(data: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  updateGoalSaving(data: any, id: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  getUser(id:any){
    return this.http.get(`${environment.apiUrl}/User/${id}`);
  }

  updateUser(id:any,data:any){
    return this.http.put(`${environment.apiUrl}/User/${id}`,data);
  }


  //Refreshes the page after a successful update
  // Lebohang Mokoena
  // 2023/08/07
  triggerRefresh() {
    this.refreshSubject.next();
  }
}
