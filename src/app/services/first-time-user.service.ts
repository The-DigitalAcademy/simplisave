import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeUserService {

private onBoardingCompletedSubject = new BehaviorSubject<boolean>(false);
onBoardingCompleted$ = this.onBoardingCompletedSubject.asObservable();

  constructor() { }

setOnBoardingCompleted(completed:boolean){
  this.onBoardingCompletedSubject.next(completed);
}

}
