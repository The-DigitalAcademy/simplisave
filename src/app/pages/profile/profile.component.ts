import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basicInfoForm!: FormGroup;
  activeForm: string = 'form1';

  constructor(private formBuilder: FormBuilder) {}


  showForm(form: string) {
    this.activeForm = form;
  }

  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      cellphone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    });
  }

  onFormSubmit() {
    if (this.basicInfoForm.valid) {
      // Perform form submission
    }
  }
  
}