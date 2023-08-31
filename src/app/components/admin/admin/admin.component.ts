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

  students: any;
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

    this.studentsList.getStudents()
      .subscribe(res => {
        this.studs = res;
        this.students=this.studs.data;
        console.log(this.studs);
        
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
