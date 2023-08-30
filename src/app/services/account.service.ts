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
                return this.http.get(`${environment.STUDENT_DETAILS_URL}`, {
                    headers,
                });
            })
        );
    }

    goalSavings(body: any) {
        return this.http.post<any>(`${environment.GOALCREATION_URL}`, body);
    }

    // createGoalSavings() {
    //     return this.authService.getToken().pipe(
    //         switchMap(token => {
    //             const headers = new HttpHeaders({
    //                 Authorization: `Bearer ${token}`,
    //             });
    //             // Make the authenticated POST request to create a goal savings record
    //             return this.http.post(`${environment.GOALCREATION_URL}`, {
    //                 headers,
    //             });
    //         })
    //     );
    // }

    // getAccountData() {
    //     return this.http.get(`${environment.backendUrl}/Transactions`);
    // }

    getTransactions() {
        return this.http.get(`${environment.TRANSACTION_URL}`);
    }

    getTransactions2() {
        return this.http.get(`${environment.TRANSACTION_URL}`);
    }

    getTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/Budget`);
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
        return this.http.put(`${this.url}/${id}`, data);
    }

    getUser(id: any) {
        return this.http.get(`${environment.apiUrl}/User/${id}`);
    }

    updateUser(id: any, data: any) {
        return this.http.patch(`${environment.UPDATE_URL}`, data);
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
                    Authorization: `${token}`,
                });
                // Make the authenticated API request using HttpClient
                return this.http.post(`${environment.TRANSACTION_URL}`, data, {
                    headers,
                });
            })
        );
    }

    triggerRefresh() {
        this.refreshSubject.next();
    }
}
