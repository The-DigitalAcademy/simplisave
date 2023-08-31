import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables
import { AuthService } from './auth-service.service';
import { User } from '../interfaces/user';
import { Transaction } from '../interfaces/transactions.model';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private refreshSubject = new Subject<void>();

    refreshObservable = this.refreshSubject.asObservable();

    private url = `${environment.backendUrl}/Goal_Savings`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getAccountData() {
        console.log(this.authService.getToken());
        return this.authService.getToken().pipe(
            switchMap(token => {
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                return this.http.get<User[]>(
                    `${environment.STUDENT_DETAILS_URL}`,
                    { headers }
                );
            })
        );
    }

    getTransactions() {
        return this.http.get<Transaction[]>(`${environment.TRANSACTION_URL}`);
    }

    getTransactions2() {
        return this.http.get<Transaction[]>(`${environment.TRANSACTION_URL}`);
    }

    getTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/budget`);
    }

    getTypesBackend(): Observable<any[]> {
        return this.http.get<any[]>(
            `${environment.BACKEND_URL}/budget/details`
        );
    }

    getSimplisaveData() {
        return this.http.get(`${environment.apiUrl}/Simpil_Savings_Account`);
    }

    createType(body: any): Observable<any> {
        return this.http.post<any>(
            `${environment.BACKEND_URL}/budget/creation`,
            body
        );
    }

    getGoalSavings(): Observable<any[]> {
        return this.http.get<[any]>(`${environment.apiUrl}/Goal_Savings`);
    }

    updateGoalSavings(data: any, id: any): Observable<any> {
        return this.http.put(`${environment.apiUrl}/Budget/${id}`, data);
    }

    updateGoalSaving(data: any, id: any): Observable<any> {
        return this.http.put(`${environment.apiUrl}/Goal_Savings/${id}`, data);
    }

    getUser(id: any) {
        return this.http.get(`${environment.apiUrl}/User/${id}`);
    }

    updateUser(id: any, data: any) {
        return this.http.patch<User[]>(`${environment.UPDATE_URL}`, data);
    }
    getOneTransaction(id: any): Observable<void> {
        return this.http.get<void>(`${environment.apiUrl}/Budget/${id}`);
    }

    updateBudget(id:any,data:any){
        return this.http.patch(`${environment.apiUrl}/budget/${id}`, data);
    }

    //Refreshes the page after a successful update
    // Lebohang Mokoena
    // 2023/08/07
    deleteTransaction(id: any): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/Budget/${id}`);
    }

    transferToSavings(id: any, data: any) {
        console.log(this.authService.getToken());
        return this.authService.getToken().pipe(
            switchMap(token => {
                const headers = new HttpHeaders({
                    Authorization: `${token}`,
                });
                // Make the authenticated API request using HttpClient
                return this.http.post(
                    `${environment.BACKEND_URL}/simplisaving/transfer/${id}`,
                    data,
                    { headers }
                );
            })
        );
    }

    getGoalID() {
        return this.http.get(`${environment.BACKEND_URL}/goalSavings/goals`);
    }

    triggerRefresh() {
        this.refreshSubject.next();
    }
}
