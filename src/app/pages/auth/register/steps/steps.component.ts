import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  isLinear = true;
  
  // FormGroups
  step1FormGroup: FormGroup = new FormGroup({});
  step2FormGroup: FormGroup = new FormGroup({});
  step3FormGroup: FormGroup = new FormGroup({});

  registrationData: any = {}; //  an array to store the registration data - Thilivhali Ravhutulu 07/08/2023

  // empty strings to store input data - Thilivhali Ravhutulu 07/08/2023
  newFirstName: string = '';
  newLastName: string = '';
  newEmail: string = '';
  newCellphoneNumber: string = '';
  newPassword: string = '';
  newConfirmPassword: string = '';
  newIdNo: string ='';
  
  //For image upload - Thilivhali Ravhutulu 16/08/2023
  previewImage: string | null = null;


  constructor(private fb: FormBuilder, private stepperService: StepperService, private router: Router) {}

  ngOnInit() {
    this.step1FormGroup = this.fb.group({
      // Define form fields for Step 1 here for validation purposes -Thilivhali Ravhutulu 05/08/2023
      // Example:
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphoneNumber: ['', Validators.required],
    });

    this.step2FormGroup = this.fb.group({
      // Define form fields for Step 2 here for validation purposes -Thilivhali Ravhutulu 05/08/2023
      // Example:
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/)],
      ],
      confirmPassword: ['', Validators.required],
    });


    this.step3FormGroup = this.fb.group({
      // Define form fields for Step 6 here for validation purposes -Thilivhali Ravhutulu 05/08/2023
      // Example:
      idNo: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{13}$') //check if there are 13 numbers
      ]],
    });

    // Initialize the stepper with the first step - Thilivhali Ravhutulu 07/08/2023
    this.stepperService.setCurrentStep(0);
  }

  get password() {
    return this.step2FormGroup.get('password');
  }

  get confirmPassword() {
    return this.step2FormGroup.get('confirmPassword');
  }


  //to verify that the passwords match - Thilivhali Ravhutulu 10/08/2023
  passwordMatch(): boolean {
    return this.newPassword === this.newConfirmPassword;
  }


  //updating step 1 - Thilivhali Ravhutulu 05/08/2023
  updateStep1Values() {
    const updatedValues = {
      firstName: this.newFirstName,
      lastName: this.newLastName,
      email: this.newEmail,
      cellphoneNumber: this.newCellphoneNumber,
    };
    
    this.step1FormGroup.patchValue(updatedValues);
  }

  //updating step 2 - Thilivhali Ravhutulu 05/08/2023
  updateStep2Values() {
    if (this.step2FormGroup.valid && this.passwordMatch()) {
      const updatedValues = {
        password: this.newPassword
      };
      
      this.step2FormGroup.patchValue(updatedValues);
      // Now you can navigate to the next step here if needed
    } 
  }

  //updating third step  - Thilivhali Ravhutulu 05/08/2023
  updateStep3Values() {
    if ( this.step3FormGroup.valid){
      const updatedValues = 
      this.step3FormGroup.get('idNo')?.value;
      
      this.step3FormGroup.patchValue(updatedValues);
      // Now you can navigate to the next step here if needed
    } 
  }
  

  onNext() {
    const currentStep = this.stepperService.getCurrentStep();
    if (currentStep === 0) {
      localStorage.setItem('step1Data', JSON.stringify(this.step1FormGroup.value));
    } else if (currentStep === 1) {
      localStorage.setItem('step2Data', JSON.stringify(this.step2FormGroup.value));
    }  else if (currentStep === 2) {
      localStorage.setItem('step3Data', JSON.stringify(this.step3FormGroup.value));
    } else if (currentStep === 3) { 
      
      this.stepperService.saveRegistrationData(); // Save registration data
    }

    this.stepperService.setCurrentStep(currentStep + 1);
  }

  onPrevious() {
    const currentStep = this.stepperService.getCurrentStep();
    this.stepperService.setCurrentStep(currentStep - 1);
  }

  successAlert(){
    // Store the data from each step - Thilivhali Ravhutulu 07/08/2023
    this.updateStep1Values();
    this.updateStep2Values();
    this.updateStep3Values();
    
    // Push the collected data into the registrationData array - Thilivhali Ravhutulu 07/08/2023
    this.registrationData = {
      ...this.registrationData,
      ...this.step1FormGroup.value,
      password: this.step2FormGroup.value.password, // Store only the password - Thilivhali Ravhutulu 14/08/2023
      ...this.step3FormGroup.value,  // Store only the ID number - Thilivhali Ravhutulu 14/08/2023
      image: this.previewImage // The image URL - Thilivhali Ravhutulu 16/08/2023
    };
    console.log("data:", this.registrationData);

    this.stepperService.updateStepData(this.registrationData);
    this.stepperService.saveRegistrationData();


    // Clear the form fields - Thilivhali Ravhutulu 07/08/2023
    this.step1FormGroup.reset();
    this.step2FormGroup.reset();
    this.step3FormGroup.reset();
    
  }

  //functions to handle file upload - Thilivhali Ravhutulu 16/08/2023
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

  //option to browse images from device - Thilivhali Ravhutulu 16/08/2023
  onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        // Process the valid image file - Thilivhali Ravhutulu 16/08/2023
      this.previewImage = URL.createObjectURL(file);
    } else {
      console.log('Invalid file type:', file.type);
    }
      // Perform any necessary actions with the uploaded file (e.g., upload to server)
      console.log('Uploaded file:', file);
    }
  }


}
