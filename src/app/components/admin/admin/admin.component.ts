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

  constructor(
    private addDialog: MatDialog,
    private studentsList: StudentsService
  ) { }

  ngOnInit() {
    this.getList();
  }

  openAddStudents() {
    const dialogRef = this.addDialog.open(AddStudentsComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getList();
        }
      }
    });
  }

  getList() {
    this.studentsList.getStudents().subscribe({
      next: res => { // Use the correct type for the response data
        console.log(res); // Log the API response to the console
        this.studs = res; // Store fetched students in the students array
        this.students=this.studs.data;
        // console.log( this.studs); 

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeStudent(id: number) {
    this.studentsList.deleteStudent(id).subscribe({
      next: (res) => {
        alert('Student Deleted!');
        this.getList();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openEditStudents(data: any) {
    const dialogRef = this.addDialog.open(AddStudentsComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getList();
        }
      }
    });
  }
}
