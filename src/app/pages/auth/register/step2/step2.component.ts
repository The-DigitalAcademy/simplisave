import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Input() step2FormGroup!: FormGroup;
  newPassword: string = '';
  newConfirmPassword: string = '';

  constructor(private dataService: DataService) {}

  // A method to store values entered in this form - Thilivhali Ravhutulu 04/08/2023
  // storeStepData() {
  //   this.dataService.setUserData({
  //     password: this.step2FormGroup.get('password')?.value,
  //     confirmPassword: this.step2FormGroup.get('confirmPassword')?.value,
  //   });
  // }

  // A method to update values in this step - Thilivhali Ravhutulu 05/08/2023
  updateStep2Values() {
    const updatedValues = {
      password: this.newPassword,
      confirmPassword: this.newConfirmPassword,
    };
    
    this.step2FormGroup.patchValue(updatedValues);
    console.log("Form data", this.step2FormGroup.value);

  }

}
