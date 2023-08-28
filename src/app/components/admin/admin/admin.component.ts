import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { StudentsService } from 'src/app/services/students.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayColumn: string[]=[
    'id',
    'firstName',
    'lastName',
    'email',
    'studentNumber',
    'year',
    'action'
  ];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','studentNumber','year','action'];
  dataSource!:  MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private addDialog:MatDialog,
    private studentsList:StudentsService
    
    ){}
    ngOnInit(){

      this.getList()
    }



  openAddStudents(){
    this.addDialog.open(AddStudentsComponent)
  }

 

  getList(){
    this.studentsList.getStudents().subscribe({
      next: (res: any)=>{  //if successful
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator
         
      },
      error: (err) =>{ //else return an error
        console.log(err)
      }
    })
  }
removeStudent(id: number){
  this.studentsList.deleteStudent(id).subscribe({
    next: (res) =>{
alert('Student Deleted!')
    },
    error: (err) =>{
      console.log(err);
      
    }
    
  })
}
  
}
