import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addTransaction!: FormGroup;

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

  

}
