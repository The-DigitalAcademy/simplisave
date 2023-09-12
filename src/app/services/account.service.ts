import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables
import { AuthService } from './auth-service.service';
import {  Profile} from '../interfaces/transactions.model';
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

    // getAccountData(): Observable<User[]>   {
       
    //     return this.authService.getToken().pipe(
    //         switchMap(token => {
    //             const headers = new HttpHeaders({
    //                 Authorization: `Bearer ${token}`,
    //             });
    //             return this.http.get<User[]>(
    //                 `${environment.STUDENT_DETAILS_URL}`,
    //                 { headers }
    //             );
    //         })
    //     );
    // }

    getAccountData(): Observable<Profile> {
        return this.authService.getToken().pipe(
          switchMap((token) => {
            const headers = new HttpHeaders({
              Authorization: `Bearer ${token}`,
            });
            return this.http.get<Profile>(`${environment.STUDENT_DETAILS_URL}`, {
              headers,
            });
          })
        );
      }
     

    getTransactions2() : Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${environment.TRANSACTION_URL}`);
    }

   
    // getTypesBackend(): Observable<Budget[]> {
    //     return this.http.get<Budget[]>(`${environment.BACKEND_URL}/budget/details`);
    //   }

    getTypesBackend(): Observable<any> {
        return this.http.get<any>(`${environment.BACKEND_URL}/budget/details`);
      }
     
     
   

    // createType(body: any): Observable<any> {
    //     return this.http.post<any>(
    //         `${environment.BACKEND_URL}/budget/creation`,
    //         body
    //     );
    // }

    createType(body: any): Observable<any> {
        return this.http.post<any>(
          `${environment.BACKEND_URL}/budget/creation`,
          body
        );
      }


    createSavingGoal(data: any): Observable<any> {
        return this.http.post(`${environment.CREATESAVINGSGOAL}`, data);
    }


    updateUser(id: any, data: any) {
        return this.http.patch<User[]>(`${environment.UPDATE_URL}`, data);
    }



    updateBudget(id:any,data:any){
        return this.http.patch(`${environment.BACKEND_URL}/budget/progress/${id}`, data);
    }

    getOneBudget(){
        return this.http.get(`${environment.BACKEND_URL}/budget/details`);

    }

    //Refreshes the page after a successful update
    // Lebohang Mokoena
    // 2023/08/07
    deleteTransaction(id: any) {
        return this.http.delete(`${environment.BACKEND_URL}/budget/${id}`);
    }

    transferToSavings(id: any, data: any) {
       
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


    triggerRefresh() {
        this.refreshSubject.next();
    }
}