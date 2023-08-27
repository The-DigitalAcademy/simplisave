import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  addStudents(data: any): Observable<any>{
    return this.http.post(' http://localhost:3000/students',data)
  }

  getStudents(): Observable<any>{
    return this.http.get(' http://localhost:3000/students')
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/students/${id}`);
  }
}
