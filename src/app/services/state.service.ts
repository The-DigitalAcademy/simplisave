import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Budget, Profile, TransactionType } from '../interfaces/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private categoryListSubject = new BehaviorSubject<Budget[]>([]);
  categoryList$ = this.categoryListSubject.asObservable();

  private accountDataSubject = new BehaviorSubject<Profile | undefined>(undefined);
  accountData$: Observable<Profile | undefined> = this.accountDataSubject.asObservable();



  private goalSubject :BehaviorSubject<string[]> = new BehaviorSubject<any>([]);
  goal$ : Observable<any[]> = this.goalSubject.asObservable();





  constructor() { }

  updateCategoryList(updatedList: Budget[]) {
    this.categoryListSubject.next(updatedList);
    console.log(updatedList);
  }

  updateAccountDetails(updatedAccountDetails:Profile | undefined){
    this.accountDataSubject.next(updatedAccountDetails);
  }

}
