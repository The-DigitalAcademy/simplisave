import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  step1FormGroup!: FormGroup;
  step2FormGroup!: FormGroup;
  // Add more form groups if you have additional steps

  constructor(private fb: FormBuilder, private stepperService: StepperService) {}

  ngOnInit() {
    this.step1FormGroup = this.fb.group({
      // Define your form fields for Step 1 here
      // Example:
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
    });

    this.step2FormGroup = this.fb.group({
      // Define your form fields for Step 2 here
      // Example:
      // email: ['', [Validators.required, Validators.email]],
      // phone: ['', Validators.required],
    });

    // Initialize the stepper with the first step
    this.stepperService.setCurrentStep(0);
  }

  onNext() {
    const currentStep = this.stepperService.getCurrentStep();
    if (currentStep === 0) {
      this.stepperService.setData('step1Data', this.step1FormGroup.value);
    } else if (currentStep === 1) {
      this.stepperService.setData('step2Data', this.step2FormGroup.value);
    }

    this.stepperService.setCurrentStep(currentStep + 1);
  }

  onPrevious() {
    const currentStep = this.stepperService.getCurrentStep();
    this.stepperService.setCurrentStep(currentStep - 1);
  }

  successAlert(){
    Swal.fire({
      icon: 'success',
      text: 'Successful! Please Login',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
  })
  }


}
