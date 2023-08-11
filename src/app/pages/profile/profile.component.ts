import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basicInfoForm!: FormGroup;
  passwordForm!: FormGroup;
  activeForm: string = 'form1';
  userInfo: any;
  userId: any = 2;

  constructor(private formBuilder: FormBuilder, private service: AccountService, private authService:AuthService) {}

  showForm(form: string) {
    this.activeForm = form;
  }

  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      cellphoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      accNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      idNo: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [ Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      newPassword: [
        '',
        [
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
     
     
    });

    this.getUsersInfo();
  }

  getUsersInfo() {
    this.service.getUser(this.userId).subscribe((res: any) => {
      this.userInfo = res;

      // Set initial form values using patchValue
      this.basicInfoForm.patchValue({
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        cellphoneNumber: this.userInfo.cellphoneNumber,
        email: this.userInfo.email,
        idNo:this.userInfo.idNo,
        accNumber:this.userInfo.accNumber,
      });

      this.passwordForm.patchValue({
        password: this.userInfo.password,
      });

      console.log(this.userInfo);
    });
  }

  onFormSubmit() {
    if (this.activeForm === 'form1') {
      this.updateUserInfo();
    } else if (this.activeForm === 'form2') {
      this.updatePassword();
    }
  }

  updateUserInfo() {
    if (this.basicInfoForm.valid) {
      const updatedInfo = {
        firstName: this.basicInfoForm.get('firstName')?.value,
        lastName: this.basicInfoForm.get('lastName')?.value,
        cellphoneNumber: this.basicInfoForm.get('cellphoneNumber')?.value,
        email: this.basicInfoForm.get('email')?.value,
        idNo: this.basicInfoForm.get('idNo')?.value,
        accNumber: this.basicInfoForm.get('accNumber')?.value,
      };

      this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
        this.authService.successfulUpdate();
        console.log('User info updated:', res);
      });
  }
}

  updatePassword() {
    if (this.passwordForm.valid) {
    const updatedInfo = {
      Password: this.basicInfoForm.get('newPassword')?.value,
     
    };
    this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
      console.log('Password updated:', res);
    });
  }
}
}
