import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private refreshSubject = new Subject<void>();

  refreshObservable = this.refreshSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/Transaction_Type`;
  private url = `${environment.apiUrl}/Goal_Savings`;

  constructor(private http: HttpClient, private authService:AuthService) { }

  getAccountData() {
    console.log(this.authService.getToken())
    return this.authService.getToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        // Make the authenticated API request using HttpClient
        return this.http.get(`${environment.backendUrl}/auth/9`, { headers });
      })
    );
    
    
  }

  getTransactions(){
    return this.http.get(`${environment.apiUrl}/Transaction`);
  }

  getTransactions2(){
    return this.http.get(`${environment.backendUrl}/transactions/listTransactions/8`);
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
  deleteTransaction(id: any): Observable<void> {
    const url = `${this.apiUrl}/transactionTypes/${id}`;
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  triggerRefresh() {
    this.refreshSubject.next();
  }
}
