import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent {

studentForm: FormGroup;

  year: string[]=[
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    'Post Graduate'
  ]
  constructor(
    private form:FormBuilder,
    private studentsService:StudentsService,
    private dialogRef:DialogRef<AddStudentsComponent>


    ){

    this.studentForm = form.group({
      firstName:'',
      lastName:'',
      email:'',
      studentNumber:'',
      year:'',

    })
  }

  onFormSubmit(){
    if(this.studentForm.valid){
     this.studentsService.addStudents(this.studentForm.value).subscribe({
      next: (val: any)=>{
    alert('Student Added Successfully')
    this.dialogRef.close();
      },
      error: (err: any)=>{
        console.error(err);
        
      }
     })
      
    }
  }
}
