import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddData } from 'src/app/interfaces/transactions.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addTransaction!: FormGroup;
  addData: AddData = { type: '', description: '', amount: '' };


  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    // Define form fields for login and validation requirements
    this.addTransaction = this.formBuilder.group({
      type: [
        '',
        [
          Validators.required
        ],
      ],
      description: [
        '',
        [
          Validators.required
        ],
      ],
      amount: [
        '',
        [
          Validators.required
        ],
      ],
    });
  }

  add(){

  }
  

}
