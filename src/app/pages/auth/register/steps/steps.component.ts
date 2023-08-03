import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { StepperService } from 'src/app/services/stepper.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  isLinear = true;
  step1FormGroup: FormGroup = new FormGroup({});
  step2FormGroup: FormGroup = new FormGroup({});
  step4FormGroup: FormGroup = new FormGroup({});
  step6FormGroup: FormGroup = new FormGroup({});
  step7FormGroup: FormGroup = new FormGroup({});

  // Add more form groups if you have additional steps

  constructor(private fb: FormBuilder, private stepperService: StepperService, private formDataService: FormDataService) {}

  ngOnInit() {
    this.step1FormGroup = this.fb.group({
      // Define your form fields for Step 1 here
      // Example:
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.step2FormGroup = this.fb.group({
      // Define your form fields for Step 2 here
      // Example:
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.step4FormGroup = this.fb.group({
      // Define your form fields for Step 4 here
      // Example:
      accountNo: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.step6FormGroup = this.fb.group({
      // Define your form fields for Step 6 here
      // Example:
      idNo: ['', Validators.required],
      pinNo: ['', Validators.required],
      confirmPinNo: ['', Validators.required]
    });

    this.formDataService.step1Data = this.step1FormGroup;

    console.log("Form data", this.step1FormGroup.value);

    // Initialize the stepper with the first step
    this.stepperService.setCurrentStep(0);
  }

  onNext() {
    const currentStep = this.stepperService.getCurrentStep();
    if (currentStep === 0) {
      this.stepperService.setData('step1Data', this.step1FormGroup.value);
    } else if (currentStep === 1) {
      this.stepperService.setData('step2Data', this.step2FormGroup.value);
    } else if (currentStep === 3) {
      this.stepperService.setData('step4Data', this.step4FormGroup.value);
    } else if (currentStep === 5) {
      this.stepperService.setData('step6Data', this.step6FormGroup.value);
    } else if (currentStep === 6) { 
      // this.stepperService.setData('step7Data', this.step7FormGroup.value);
      this.stepperService.saveRegistrationData(); // Save registration data
    }

    this.stepperService.setCurrentStep(currentStep + 1);
  }

  onPrevious() {
    const currentStep = this.stepperService.getCurrentStep();
    this.stepperService.setCurrentStep(currentStep - 1);
  }

  successAlert(){
    this.stepperService.saveRegistrationData();
    Swal.fire({
      icon: 'success',
      text: 'Successful! Please Login',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
  })
  }


}
