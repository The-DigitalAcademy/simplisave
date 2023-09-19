import { Transaction } from 'src/app/interfaces/transactions.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeUserService {

  private onBoardingCompletedSubject = new BehaviorSubject<boolean>(false);
  onBoardingCompleted$ = this.onBoardingCompletedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialize the onBoardingCompletedSubject only once in the constructor
    // Set it to the initial value of false
  }

  setOnBoardingCompleted(completed: boolean) {
    // Update the onBoardingCompletedSubject with the provided value
    this.onBoardingCompletedSubject.next(completed);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.TRANSACTION_URL}`).pipe(
      tap((transactions: Transaction[]) => {
        if (transactions.length === 0) {
          // If transactions are empty, set onBoardingCompleted to false
          this.setOnBoardingCompleted(false);
        } else {
          // If there are transactions, set onBoardingCompleted to true
          this.setOnBoardingCompleted(true);
        }
      })
    );
  }
}
