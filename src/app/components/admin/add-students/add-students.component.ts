import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

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
    private dialogRef:MatDialogRef<AddStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any


    ){

    this.studentForm = form.group({
      firstName:'',
      lastName:'',
      email:'',
      studentNumber:'',
      year:'',

    })
  }
  ngOnInit(): void {
    this.studentForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.studentForm.valid){

      if(this.data){
       
        this.studentsService.updateStudents(this.data.id ,this.studentForm.value).subscribe({
          next: (val: any)=>{
        alert('Student Updated Successfully')
        this.dialogRef.close(true);
          },
          error: (err: any)=>{
            console.error(err);
            
          }
         })

      }
      else{
     this.studentsService.addStudents(this.studentForm.value).subscribe({
      next: (val: any)=>{
    alert('Student Added Successfully')
    this.dialogRef.close(true);
      },
      error: (err: any)=>{
        console.error(err);
        
      }
     })
    }
    }
  }
}
