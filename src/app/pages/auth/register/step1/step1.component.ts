import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component{
  @Input() step1FormGroup!: FormGroup;
  newFullName: string = '';
  newEmail: string = '';
  newPhone: string = '';

  constructor(private dataService: DataService) {}

  // A method to store values entered in this form - Thilivhali Ravhutulu 04/08/2023
  // storeStepData() {
  //   this.dataService.setUserData({
  //     name: this.step1FormGroup.get('name')?.value,
  //     email: this.step1FormGroup.get('email')?.value,
  //     phone: this.step1FormGroup.get('phone')?.value
  //   });
  // }

  // A method to update values in this step - Thilivhali Ravhutulu 05/08/2023
  updateStep1Values() {
    const updatedValues = {
      fullName: this.newFullName,
      email: this.newEmail,
      phone: this.newPhone,
    };
    
    this.step1FormGroup.patchValue(updatedValues);
    console.log("Form data", this.step1FormGroup.value);
  }

  // A method to store values using localStorage  - Thilivhali Ravhutulu 05/08/2923
  // store(): void {
  //   const nameInput = document.getElementById('name') as HTMLInputElement;
  //   const emailInput = document.getElementById('email') as HTMLInputElement;
  //   const phoneInput = document.getElementById('phone') as HTMLInputElement;
  //   const lowerCaseLetters = /[a-z]/g;
  //   const upperCaseLetters = /[A-Z]/g;
  //   const numbers = /[0-9]/g;

  //   if (nameInput.value.length === 0) {
  //     alert('Please fill in email');
  //   } else if (emailInput.value.length === 0) {
  //     alert('Please fill in email');
  //   } else if (phoneInput.value.length === 0 ) {
  //     alert('Please fill in phone number');
  //   } else {
  //     localStorage.setItem('name', nameInput.value);
  //     localStorage.setItem('email', emailInput.value);
  //     localStorage.setItem('phone', phoneInput.value);

  //   }
  // }
  
}
