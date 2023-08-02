import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }


//   getTransactions(){
//     return this.http.get('http://localhost:3000/Transaction');
//    }

private refreshSubject = new Subject<void>();

// Observable to subscribe for refresh events
refreshObservable$ = this.refreshSubject.asObservable();

triggerRefresh() {
  this.refreshSubject.next();
}
}
