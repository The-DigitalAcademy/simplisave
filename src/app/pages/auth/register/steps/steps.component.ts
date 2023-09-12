import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { Router } from '@angular/router';
import { RegistrationData } from 'src/app/interfaces/user'; // Import only the RegistrationData interface

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  isLinear = true;
  showPassword: boolean = false;
  step1FormGroup: FormGroup;
  step2FormGroup: FormGroup;
  step3FormGroup: FormGroup;
  registrationData: RegistrationData = {
    firstName: '',
    lastName: '',
    email: '',
    cellphoneNumber: '',
    password: '',
    confirmPassword: '',
    accountNo: '',
    idNo: '',
    profileImage: null,
    savingsAccountNumber:'',
  };
  previewImage: string | null = null;

  constructor(private fb: FormBuilder, private stepperService: StepperService, private router: Router) {


    this.step1FormGroup = this.fb.group({
      // Define form fields for Step 1 here for validation purposes
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphoneNumber: ['', Validators.required],
    });
 
    this.step2FormGroup = this.fb.group({
      // Define form fields for Step 2 here for validation purposes
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/)],
      ],
      confirmPassword: ['', Validators.required],
    });
 
    this.step3FormGroup = this.fb.group({
      // Define form fields for Step 3 here for validation purposes
      idNo: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{13}$') //check if there are 13 numbers
      ]],
    });

    this.stepperService.setCurrentStep(0);


  }

  ngOnInit() {
    this.step1FormGroup = this.fb.group({
      firstName: [this.registrationData.firstName, Validators.required],
      lastName: [this.registrationData.lastName, Validators.required],
      email: [this.registrationData.email, [Validators.required, Validators.email]],
      cellphoneNumber: [this.registrationData.cellphoneNumber, Validators.required],
    });

    this.step2FormGroup = this.fb.group({
      password: [
        this.registrationData.password,
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/)],
      ],
      confirmPassword: ['', Validators.required],
    });

    this.step3FormGroup = this.fb.group({
      idNo: [
        this.registrationData.idNo,
        [
          Validators.required,
          Validators.pattern('^[0-9]{13}$'),
        ],
      ],
    });

    this.stepperService.setCurrentStep(0);
  }

  get password() {
    return this.step2FormGroup.get('password');
  }

  get confirmPassword() {
    return this.step2FormGroup.get('confirmPassword');
  }

  passwordMatch(): boolean {
    return this.registrationData.password === this.step2FormGroup.value.confirmPassword;
  }

  onNext() {
    const currentStep = this.stepperService.getCurrentStep();
    if (currentStep === 0) {
      localStorage.setItem('step1Data', JSON.stringify(this.step1FormGroup.value));
    } else if (currentStep === 1) {
      localStorage.setItem('step2Data', JSON.stringify(this.step2FormGroup.value));
    } else if (currentStep === 2) {
      localStorage.setItem('step3Data', JSON.stringify(this.step3FormGroup.value));
    } else if (currentStep === 3) {
      this.stepperService.saveRegistrationData();
    }

    this.stepperService.setCurrentStep(currentStep + 1);
  }

  onPrevious() {
    const currentStep = this.stepperService.getCurrentStep();
    this.stepperService.setCurrentStep(currentStep - 1);
  }

  successAlert() {
    this.registrationData = {
      ...this.registrationData,
      ...this.step1FormGroup.value,
      password: this.step2FormGroup.value.password,
      ...this.step3FormGroup.value,
      image: this.previewImage,
    };

    this.stepperService.updateStepData(this.registrationData);
    this.stepperService.saveRegistrationData();

    this.step1FormGroup.reset();
    this.step2FormGroup.reset();
    this.step3FormGroup.reset();
  }

  updateStep1Values() {
    // This function will be called when the Step 1 form is submitted.
    // You can access and update the form values using this.step1FormGroup.value.
    const step1FormValues = this.step1FormGroup.value;
    console.log('Step 1 Form Values:', step1FormValues);
  }
 
  updateStep2Values() {
    // This function will be called when the Step 2 form is submitted.
    // You can access and update the form values using this.step2FormGroup.value.
    const step2FormValues = this.step2FormGroup.value;
    console.log('Step 2 Form Values:', step2FormValues);
  }
 
  updateStep3Values() {
    // This function will be called when the Step 3 form is submitted.
    // You can access and update the form values using this.step3FormGroup.value.
    const step3FormValues = this.step3FormGroup.value;
    console.log('Step 3 Form Values:', step3FormValues);
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('drag-over');
  }

  onDragExit(event: any) {
    event.currentTarget.classList.remove('drag-over');
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        this.previewImage = URL.createObjectURL(file);
      } else {
        console.log('Invalid file type:', file.type);
      }
      console.log('Uploaded file:', file);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}