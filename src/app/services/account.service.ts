import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables
import { AuthService } from './auth-service.service';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private refreshSubject = new Subject<void>();

    refreshObservable = this.refreshSubject.asObservable();

    private url = `${environment.apiUrl}/Goal_Savings`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    // getAccountData() {
    //   console.log(this.authService.getToken())
    //   return this.authService.getToken().pipe(
    //     switchMap(token => {
    //       const headers = new HttpHeaders({
    //         Authorization: `Bearer ${token}`
    //       });
    //       // Make the authenticated API request using HttpClient
    //       return this.http.get(`${environment.backendUrl}/accounts/account-balance`, { headers });
    //     })
    //   );

    getAccountData() {
        return this.http.get(`${environment.apiUrl}/Account`);
    }

    getTransactions() {
        return this.http.get(`${environment.apiUrl}/Transaction`);
    }

    getTransactions2() {
        return this.http.get(`${environment.apiUrl}/Transaction`);
    }

    getTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/Budget`);
    }

    getSimplisaveData() {
        return this.http.get(`${environment.apiUrl}/Simpil_Savings_Account`);
    }

    createType(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/Budget`, body);
    }

    getGoalSavings(): Observable<any[]> {
        return this.http.get<[any]>(`${environment.apiUrl}/Goal_Savings`);
    }

    updateGoalSavings(data: any, id: any): Observable<any> {
        return this.http.put(`${environment.apiUrl}/Budget/${id}`, data);
    }

    updateGoalSaving(data: any, id: any): Observable<any> {
        return this.http.put(`${this.url}/${id}`, data);
    }

    getUser(id: any) {
        return this.http.get(`${environment.apiUrl}/User/${id}`);
    }

    updateUser(id: any, data: any) {
        return this.http.put(`${environment.apiUrl}/User/${id}`, data);
    }
    getOneTransaction(id: any): Observable<void> {
        return this.http.get<void>(`${environment.apiUrl}/Budget/${id}`);
    }

    //Refreshes the page after a successful update
    // Lebohang Mokoena
    // 2023/08/07
    deleteTransaction(id: any): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/Budget/${id}`);
    }

    transferToSavings(data: any) {
        console.log(this.authService.getToken());
        return this.authService.getToken().pipe(
            switchMap(token => {
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                });
                // Make the authenticated API request using HttpClient
                return this.http.post(
                    `${environment.backendUrl}/accounts/transfer/8`,
                    data,
                    { headers }
                );
            })
        );
    }

    triggerRefresh() {
        this.refreshSubject.next();
    }
}
