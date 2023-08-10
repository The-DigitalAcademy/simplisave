import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

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

  constructor(private formBuilder: FormBuilder, private service: AccountService) {}

  showForm(form: string) {
    this.activeForm = form;
  }

  ngOnInit() {
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      cellphone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{13}$/)]],
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });

    this.getUsersInfo();
  }

  onFormSubmit() {
    console.log("form has been submitted!")
    if (this.activeForm === 'form1') {
      this.updateUserInfo();
    } else if (this.activeForm === 'form2') {
      this.updatePassword();
    }
  }

  getUsersInfo() {
    this.service.getUser(this.userId).subscribe((res: any) => {
      this.userInfo = res;
      console.log(this.userInfo);
    });
  }

  updateUserInfo() {
    if (this.basicInfoForm.valid) {
      const updatedInfo = {
        First_Name: this.basicInfoForm.get('firstName')?.value,
        Last_Name: this.basicInfoForm.get('lastName')?.value,
        Cellphone: this.basicInfoForm.get('cellphone')?.value,
        Email: this.basicInfoForm.get('email')?.value,
      };

      this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
        console.log('User info updated:', res);
      });
    }
  }

  updatePassword() {
    console.log("updating password!")


      const updatedInfo = {
        Password:this.passwordForm.get('newPassword')?.value
        , First_Name: this.basicInfoForm.get('firstName')?.value,
        Last_Name: this.basicInfoForm.get('lastName')?.value,
        Cellphone: this.basicInfoForm.get('cellphone')?.value,
        Email: this.basicInfoForm.get('email')?.value
        
      };
      console.log(updatedInfo);

      this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
        console.log('Password updated:', res);
      });
    }
  }

