import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TransactionType } from '../interfaces/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private categoriesSubject: BehaviorSubject<TransactionType[]> = new BehaviorSubject<TransactionType[]>([]);
  categories$!: Observable<TransactionType[]>; // Observable to track categories



  constructor() { }
}
