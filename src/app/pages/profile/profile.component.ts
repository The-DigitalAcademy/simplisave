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
  items1:any;

  constructor(private formBuilder: FormBuilder, private service: AccountService, private authService:AuthService) {}



  ngOnInit() {
    /*    When the form is loaded, initialize the form fields and add validation rules to them
        2023/08/14
 */
    this.basicInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      cellphoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      accountNo: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
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

    
      this.service.getTransactions2()
        .subscribe(res => {
          this.items1 = res;
          console.log(this.items1);
        });

    this.getUsersInfo();
    
  }



      /* This function fetches a ceratin users info and assigns it to the form fields so that they display in the input boxes
      when the form is loaded
        2023/08/14 */
  getUsersInfo() {
    this.service.getAccountData().subscribe((res: any) => {
      this.userInfo = res;

      // Set initial form values using patchValue
      this.basicInfoForm.patchValue({
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        cellphoneNumber: this.userInfo.cellphoneNumber,
        email: this.userInfo.email,
        idNo:this.userInfo.idNo,
        accountNo:this.userInfo.accounts[0].accountNo,
      });

      this.passwordForm.patchValue({
        password: this.userInfo.password,
      });

      console.log(this.userInfo);
    });
  }

  
  
  /* When a form is submitted, this function checks which form was submitted and then executes the method associated
  with that form
        2023/08/14*/
  onFormSubmit() {
    if (this.activeForm === 'form1') {
      this.updateUserInfo();
    } else if (this.activeForm === 'form2') {
     // this.updatePassword();
    }
  }


  /* This function is used to switch between the Info and password forms, when the value of activeForm is changed it
     stores the a new value, triggering the html to display another form
        2023/08/14*/
  showForm(form: string) {
    this.activeForm = form;
  }

   /* This function fetches and stores form values when the form is submitted and then calls and http post method,
    to update stored values, passing in the stored values
        2023/08/15*/
  updateUserInfo() {
    if (this.basicInfoForm.valid) {
      const updatedInfo = {
        firstName: this.basicInfoForm.get('firstName')?.value,
        lastName: this.basicInfoForm.get('lastName')?.value,
        cellphoneNumber: this.basicInfoForm.get('cellphoneNumber')?.value,
        email: this.basicInfoForm.get('email')?.value,
        idNo: this.basicInfoForm.get('idNo')?.value,
        accountNo: this.basicInfoForm.get('accountNo')?.value,
      };

      this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
        this.authService.successfulUpdate();
        console.log('User info updated:', res);
      });
  }
}

  /* updatePassword() {
    if (this.passwordForm.valid) {
    const updatedInfo = {
      Password: this.basicInfoForm.get('newPassword')?.value,
     
    };
    this.service.updateUser(this.userId, updatedInfo).subscribe((res: any) => {
      console.log('Password updated:', res);
    });
  }
} */
}
