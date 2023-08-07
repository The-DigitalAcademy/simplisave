import { RegistrationData } from './../../../../interfaces/registration-data';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { StepperService } from 'src/app/services/stepper.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  registrationData: any[] = []; //  an array to store the registration data

  userData: User | null;
  newFullName: string = '';
  newEmail: string = '';
  newPhone: string = '';
  newPassword: string = '';
  newConfirmPassword: string = '';
  newAccountNo: string = '';
  newPin: any = '';
  newIdNo: any ='';
  newPinNo: any = '';
  newConfirmPinNo: any ='';

  constructor(private fb: FormBuilder, private stepperService: StepperService, private router: Router, private userService: UserService) {
    this.userData = this.userService.getUser();
  }

  ngOnInit() {
    this.step1FormGroup = this.fb.group({
      // Define form fields for Step 1 here
      // Example:
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    this.step2FormGroup = this.fb.group({
      // Define form fields for Step 2 here
      // Example:
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.step4FormGroup = this.fb.group({
      // Define form fields for Step 4 here
      // Example:
      accountNo: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.step6FormGroup = this.fb.group({
      // Define form fields for Step 6 here
      // Example:
      idNo: ['', Validators.required],
      pinNo: ['', Validators.required],
      confirmPinNo: ['', Validators.required]
    });


    console.log("Form data", this.step1FormGroup.value);

    // Initialize the stepper with the first step
    this.stepperService.setCurrentStep(0);
  }


  //updating step 1 - Thilivhali Ravhutulu 05/08/2023
  updateStep1Values() {
    const updatedValues = {
      fullName: this.newFullName,
      email: this.newEmail,
      phone: this.newPhone,
    };
    
    this.step1FormGroup.patchValue(updatedValues);
  }

  //updating step 2 - Thilivhali Ravhutulu 05/08/2023
  updateStep2Values() {
    const updatedValues = {
      password: this.newPassword,
      confirmPassword: this.newConfirmPassword,
    };
    
    this.step2FormGroup.patchValue(updatedValues);

  }

  //updating third step  - Thilivhali Ravhutulu 05/08/2023
  updateStep4Values() {
    const updatedValues = {
      accountNo: this.newAccountNo,
      pin: this.newPin,
    };
    
    this.step4FormGroup.patchValue(updatedValues);

  }

  //updating fourth step  - Thilivhali Ravhutulu 05/08/2023
  updateStep6Values() {
    const updatedValues = {
      idNo: this.newIdNo,
      pinNo: this.newPinNo,
      confirmPinNo: this.newConfirmPinNo,
    };
    
    this.step6FormGroup.patchValue(updatedValues);

  }
  

  onNext() {
    const currentStep = this.stepperService.getCurrentStep();
    if (currentStep === 0) {
      localStorage.setItem('step1Data', JSON.stringify(this.step1FormGroup.value));
    } else if (currentStep === 1) {
      localStorage.setItem('step2Data', JSON.stringify(this.step2FormGroup.value));
    } else if (currentStep === 3) {
      localStorage.setItem('step4Data', JSON.stringify(this.step4FormGroup.value));
    } else if (currentStep === 5) {
      localStorage.setItem('step6Data', JSON.stringify(this.step6FormGroup.value));
    } else if (currentStep === 6) { 
      // this.completeRegistration();
      // this.stepperService.setData('step7Data', this.step7FormGroup.value);
      this.stepperService.saveRegistrationData(); // Save registration data
    }

    this.stepperService.setCurrentStep(currentStep + 1);

    console.log("Form data", this.step1FormGroup.value);

  }

  onPrevious() {
    const currentStep = this.stepperService.getCurrentStep();
    this.stepperService.setCurrentStep(currentStep - 1);
  }

  successAlert(){
    // Store the data from each step
    this.updateStep1Values();
    this.updateStep2Values();
    this.updateStep4Values();
    this.updateStep6Values();
    console.log("Form data", this.step1FormGroup.value, this.step2FormGroup.value,  this.step4FormGroup.value,  this.step6FormGroup.value );

    // Push the collected data into the registrationData array
    this.registrationData.push(
    this.step1FormGroup.value,
    this.step2FormGroup.value,
    this.step4FormGroup.value,
    this.step6FormGroup.value
    );
    console.log("data:", this.registrationData);

    this.stepperService.saveRegistrationData();


    Swal.fire({
      icon: 'success',
      text: 'Successful! Please Login',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
  })
    // this.completeRegistration();
    // this.navigateToLogin();

    // Clear the form fields
    this.step1FormGroup.reset();
    this.step2FormGroup.reset();
    this.step4FormGroup.reset();
    this.step6FormGroup.reset();
    
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }

  completeRegistration() {
    const step1Data = JSON.parse(localStorage.getItem('step1Data') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('step2Data') || '{}');
    const step4Data = JSON.parse(localStorage.getItem('step4Data') || '{}');
    const step6Data = JSON.parse(localStorage.getItem('step6Data') || '{}');

    const userData = {
      ...step1Data,
      ...step2Data,
      ...step4Data,
      ...step6Data
    };
  
    console.log('User registration completed:', userData);
    localStorage.clear(); // Clear stored data
  
    this.navigateToLogin();
}

}
