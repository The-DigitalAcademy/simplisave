import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component {
  @Input() step6FormGroup!: FormGroup;
  newIdNo: any ='';
  newPinNo: any = '';
  newConfirmPinNo: any ='';

  constructor(private dataService: DataService) {}

  // A method to store values entered in this form - Thilivhali Ravhutulu 04/08/2023
  // storeStepData() {
  //   this.dataService.setUserData({
  //     idNo: this.step6FormGroup.get('idNo')?.value,
  //     pinNo: this.step6FormGroup.get('pinNo')?.value,
  //     confirmPinNo: this.step6FormGroup.get('confirmPinNo')?.value,

  //   });
  // }

  // A method to update values in this step - Thilivhali Ravhutulu 05/08/2023
  updateStep6Values() {
    const updatedValues = {
      idNo: this.newIdNo,
      pinNo: this.newPinNo,
      confirmPinNo: this.newConfirmPinNo,
    };
    
    this.step6FormGroup.patchValue(updatedValues);
    console.log("Form data", this.step6FormGroup.value);

  }

}
