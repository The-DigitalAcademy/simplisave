import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from 'src/app/services/stepper.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FileUploaderService } from 'src/app/services/file-uploader.service';

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
  step4FormGroup: FormGroup = new FormGroup({});
  step6FormGroup: FormGroup = new FormGroup({});
  step7FormGroup: FormGroup = new FormGroup({});

  registrationData: any[] = []; //  an array to store the registration data - Thilivhali Ravhutulu 07/08/2023

  // empty strings to store input data - Thilivhali Ravhutulu 07/08/2023
  newFirstName: string = '';
  newLastName: string = '';
  newEmail: string = '';
  newCellphoneNumber: string = '';
  newPassword: string = '';
  newConfirmPassword: string = '';
  newAccountNo: string = '';
  newPin: any = '';
  newIdNo: any ='';
  newPinNo: any = '';
  newConfirmPinNo: any ='';
  
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder, private stepperService: StepperService, private router: Router, private fileUploaderService: FileUploaderService) {}

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
        [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/)],
      ],
      confirmPassword: ['', Validators.required],
    });

    this.step4FormGroup = this.fb.group({
      // Define form fields for Step 4 here for validation purposes -Thilivhali Ravhutulu 05/08/2023
      // Example:
      accountNo: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.step6FormGroup = this.fb.group({
      // Define form fields for Step 6 here for validation purposes -Thilivhali Ravhutulu 05/08/2023
      // Example:
      idNo: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{13}$') //check if there are 13 numbers
      ]],
      pinNo: ['', [
        Validators.required,
        Validators.minLength(4),  // minimum length
        Validators.maxLength(8), // maximum length
        Validators.pattern(/^\d+$/), // Add your desired pattern, in this case making sure it is a number - Thilivhali Ravhutulu 10/08/2023
     ]],
      confirmPinNo: ['', Validators.required]
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

  get pin() {
    return this.step6FormGroup.get('pin');
  }

  get confirmPinNo() {
    return this.step6FormGroup.get('confirmPinNo');
  }

  //to verify that the passwords match - Thilivhali Ravhutulu 10/08/2023
  passwordMatch(): boolean {
    return this.newPassword === this.newConfirmPassword;
  }

  //to verify that the pins match - Thilivhali Ravhutulu 10/08/2023
  pinMatch(): boolean {
    return this.newPinNo === this.newConfirmPinNo;
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
        password: this.newPassword,
        confirmPassword: this.newConfirmPassword,
      };
      
      this.step2FormGroup.patchValue(updatedValues);
      // Now you can navigate to the next step here if needed
    } 
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
    if ( this.step6FormGroup.valid && this.pinMatch()){
      const updatedValues = this.step6FormGroup.get('idNo')?.value;
      
      this.step6FormGroup.patchValue(updatedValues);
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
      localStorage.setItem('step6Data', JSON.stringify(this.step6FormGroup.value));
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
    this.updateStep6Values();
    console.log("Form data", this.step1FormGroup.value, this.step2FormGroup.value, this.step6FormGroup.value );

    // Push the collected data into the registrationData array - Thilivhali Ravhutulu 07/08/2023
    this.registrationData.push(
    this.step1FormGroup.value,
    this.step2FormGroup.value,
    this.step6FormGroup.value
    );
    console.log("data:", this.registrationData);

    this.stepperService.saveRegistrationData();


    Swal.fire({
      icon: 'success',
      text: 'Successful! Please Login',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B'
    }).then(() => {
      // Navigate to the login page
      this.router.navigate(['/login']);
     })

    // Clear the form fields - Thilivhali Ravhutulu 07/08/2023
    this.step1FormGroup.reset();
    this.step2FormGroup.reset();
    this.step6FormGroup.reset();
    
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      this.selectedFile = inputElement.files[0];
    }
  }

  upload() {
    if (this.selectedFile) {
      this.fileUploaderService.uploadFile(this.selectedFile).subscribe(
        (uploadedUrl) => {
          // Handle the uploaded URL or any other response from the service.
          console.log('File uploaded successfully:', uploadedUrl);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }


}
