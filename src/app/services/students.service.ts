import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/students';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  addStudents(data: any): Observable<any>{
    return this.http.post(' https://simplisave.software/api/v1/admin/students',data)
  }

  updateStudents(id: number, data: any): Observable<any>{
    return this.http.put(`https://simplisave.software/api/v1/admin/students/${id}`,data)
  }

  getStudents() {
    return this.http.get(environment.STUDENTS_LIST_URL);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(environment.DELETE_STUDENT_URL);
  }
}
