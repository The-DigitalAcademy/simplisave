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


  private profileSubject= new BehaviorSubject<Profile | undefined>(undefined);
  profileData$: Observable<Profile | undefined> = this.profileSubject.asObservable();




  constructor() { }

  updateCategoryList(updatedList: Budget[]) {
    this.categoryListSubject.next(updatedList);
    console.log(updatedList);
  }

  updateAccountDetails(updatedAccountDetails:Profile | undefined){
    this.accountDataSubject.next(updatedAccountDetails);
  }

  updateGoal(goal:any){
    this.goalSubject.next(goal);
  }

  updateProfile(updatedProfile:Profile){
    this.profileSubject.next(updatedProfile);
  }
}
