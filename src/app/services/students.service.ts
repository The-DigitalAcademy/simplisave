import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }
//Json 
  // addStudents(data: any): Observable<any>{
  //   return this.http.post(' http://localhost:3000/students',data)
  // }

  // updateStudents(id: number, data: any): Observable<any>{
  //   return this.http.put(`http://localhost:3000/students/${id}`,data)
  // }

  // getStudents(): Observable<any>{
  //   return this.http.get(' http://localhost:3000/students')
  // }

  // deleteStudent(id: number): Observable<any> {
  //   return this.http.delete(`http://localhost:3000/students/${id}`);
  // }


  //backend

getAllStudents(): Observable<any>{
  return this.http.get('https://simplisave.software/api/v1/admin/students');
}
}
