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

  constructor(private dataService: DataService) {}

  storeStepData() {
    this.dataService.setUserData({
      password: this.step2FormGroup.get('password')?.value,
      confirmPassword: this.step2FormGroup.get('confirmPassword')?.value,
    });
  }

}
