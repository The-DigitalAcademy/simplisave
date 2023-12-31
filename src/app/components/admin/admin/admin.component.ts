import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/interfaces/students';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  filteredData: any[] = [];
  searchTerm: string = '';
  students: any;
  studs: any;
  element: Student | undefined; 

  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'username', 'email','cellphoneNumber','action' ];
  dataSource = new MatTableDataSource<Student>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  

  constructor(
    private addDialog: MatDialog,
    private studentsList: StudentsService
  ) { }

  ngOnInit() {
    this.getList();
  }

  removeStudentConfirmation(userId: string) {
    this.removeStudent(userId); // Call the actual removeStudent function
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getList() {
    this.studentsList.getStudents()
      .subscribe(res => {
        this.studs = res;
        this.students = this.studs.Data;
  
        // Update dataSource with fetched data
        this.dataSource.data = this.students;
  
      });
  }
  

  async removeStudent(userId: string) {
    const userIdNumber = parseInt(userId, 10); // Convert string to number
  
    // Display confirmation popup
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      iconColor:'red',
      showCancelButton: true,
      confirmButtonColor: '#AF144B',
      cancelButtonColor: '#95B9C7',
      confirmButtonText: 'Yes, delete it!'
    });
  
    // If admin confirms, proceed with deletion
    if (result.isConfirmed) {
      this.studentsList.deleteStudent(userId)
        .subscribe(res => {
          this.studs = res;
          this.getList();
          this.students = this.studs.Data;
          if (this.students) {
            this.element = this.students.find((student: Student) => student.userId === userIdNumber);
          }
        });
  
        Swal.fire({
          title: 'Deleted!',
          text: 'The student has been deleted.',
          icon: 'success',
          iconColor: '#2F539B',  
          confirmButtonColor: '#2F539B', 
          customClass: {
            popup: 'swal-popup-success'
          }
        });
    }
  }
  
  
  


}

