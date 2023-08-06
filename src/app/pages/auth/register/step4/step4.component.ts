import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component {
  @Input() step4FormGroup!: FormGroup;
  newAccountNo: string = '';
  newPin: any = '';

  constructor(private dataService: DataService) {}

  // A method to store values entered in this form - Thilivhali Ravhutulu 04/08/2023
  // storeStepData() {
  //   this.dataService.setUserData({
  //     accountNo: this.step4FormGroup.get('accountNo')?.value,
  //     pin: this.step4FormGroup.get('pin')?.value,
  //   });
  // }

  // A method to update values in this step - Thilivhali Ravhutulu 05/08/2023
  updateStep4Values() {
    const updatedValues = {
      accountNo: this.newAccountNo,
      pin: this.newPin,
    };
    
    this.step4FormGroup.patchValue(updatedValues);
    console.log("Form data", this.step4FormGroup.value);
  }

}
