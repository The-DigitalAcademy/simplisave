import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'; // Import environment variables
import { AuthService } from './auth-service.service';
import {  ApiResponse, BudgetsResponse, CreateTypeRequest, CreateTypeResponse, Profile, TransferData} from '../interfaces/transactions.model';
import { User } from '../interfaces/user';
import { Transaction, SavingsGoal } from '../interfaces/transactions.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private refreshSubject = new Subject<void>();
    private addData: any = {};

    refreshObservable = this.refreshSubject.asObservable();

    private url = `${environment.backendUrl}/Goal_Savings`;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {}

//INTERFACE FOR PROFILE, MANAGE-EXPENSE, TRANSFER-MODAL, TOP-PART, BALANCE-SUMMARY, NAV-BAR & SECOND-NAV-BAR
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
     
//INTERFACE FOR EXPENSE, MANAGE-EXPENSE, TOP-PART,
    getTransactions2() : Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${environment.TRANSACTION_URL}`);
    }



    //INTERFACE FOR EXPENSE MANAGE-EXPENSE & EXPENSE-MODAL
    getTypesBackend(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${environment.BACKEND_URL}/budget/details`);
}

updateData(data: any): void {
        this.addData = { ...this.addData, ...data };
      }

      addTransaction(transactionData: any): Observable<any> {
        return this.http.post(`${environment.BACKEND_URL}/transactions/transaction`, transactionData);
      }
     //EXPENSE-MODAL
    createType(body: CreateTypeRequest): Observable<CreateTypeResponse> {
        return this.http.post<CreateTypeResponse>(
          `${environment.BACKEND_URL}/budget/creation`,
          body
        );
      }
     
//MANAGE-EXPENSE

    createSavingGoal(data: SavingsGoal): Observable<SavingsGoal> {
        return this.http.post<SavingsGoal>(`${environment.CREATESAVINGSGOAL}`, data);
    }


//PROFILE
    updateUser(id: number, data: User): Observable <User[]> {
        return this.http.patch<User[]>(`${environment.UPDATE_URL}`, data);
    }


//MANAGE-MODAL
    updateBudget(id:number, data:CreateTypeRequest): Observable<CreateTypeResponse>{
        return this.http.patch<CreateTypeResponse>(`${environment.BACKEND_URL}/budget/progress/${id}`, data);
    }

 //MANAGE_MODAL
    getOneBudget(): Observable <BudgetsResponse>{
        return this.http.get<BudgetsResponse>(`${environment.BACKEND_URL}/budget/details`);

     }

    //Refreshes the page after a successful update
    // Lebohang Mokoena
    // 2023/08/07
    deleteTransaction(id: number): Observable<Transaction> {
        return this.http.delete<Transaction>(`${environment.BACKEND_URL}/budget/${id}`);
    }

    transferToSavings(id: number, data: TransferData): Observable <TransferData>  {
       
        return this.authService.getToken().pipe(
            switchMap(token => {
                const headers = new HttpHeaders({
                    Authorization: `${token}`,
                });
                // Make the authenticated API request using HttpClient
                return this.http.post<TransferData>(
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