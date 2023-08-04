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

  constructor(private dataService: DataService) {}

  storeStepData() {
    this.dataService.setUserData({
      idNo: this.step6FormGroup.get('idNo')?.value,
      pinNo: this.step6FormGroup.get('pinNo')?.value,
      confirmPinNo: this.step6FormGroup.get('confirmPinNo')?.value,

    });
  }

}
