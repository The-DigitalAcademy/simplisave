import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/interfaces/students';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  students: Student[] = [];
  studs: any;
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items per page


  constructor(
    private addDialog: MatDialog,
    private studentsList: StudentsService
  ) { }

  ngOnInit() {
    this.getList();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage - 1;
  }

  getList() {
    this.studentsList.getStudents().subscribe({
      next: res => { // Use the correct type for the response data
        console.log(res); // Log the API response to the console
        this.studs = res; // Store fetched students in the students array
        this.students=this.studs.Data;
        // console.log( this.studs); 

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeStudent(userId: number) {
    this.studentsList.deleteStudent(userId).subscribe({
      next: (res) => {
        alert('Student Deleted!');
        this.getList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
