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

  constructor(private dataService: DataService) {}

  storeStepData() {
    this.dataService.setUserData({
      accountNo: this.step4FormGroup.get('accountNo')?.value,
      pin: this.step4FormGroup.get('pin')?.value,
    });
  }

}
