import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Profile } from 'src/app/interfaces/transactions.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  basicInfoForm!: FormGroup;
  passwordForm!: FormGroup;
  activeForm: string = 'form1';
  userInfo: Profile;
  userId: number = 2;
  items1:any;
  selectedImageFile: File | null = null; // Initialize to null

  constructor(private formBuilder: FormBuilder, private service: AccountService, private authService:AuthService) {
    this.userInfo = {} as Profile;
  }



  ngOnInit() {
    /*    When the form is loaded, initialize the form fields and add validation rules to them
        2023/08/14
 */
        this.basicInfoForm = this.formBuilder.group({
            firstName: [
                '',
                [Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
            ],
            lastName: [
                '',
                [Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
            ],
            cellphoneNumber: [
                '',
                [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
            ],
            email: ['', [Validators.required, Validators.email]],
            accountNo: [
                { value: '', disabled: true },
                [Validators.required, Validators.pattern(/^[0-9]{8}$/)],
            ],
            idNo: [
                { value: '', disabled: true },
                [Validators.required, Validators.pattern(/^[0-9]{13}$/)],
            ],
        });

        this.passwordForm = this.formBuilder.group({
            password: [
                '',
                [
                    Validators.pattern(
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    ),
                ],
            ],
            newPassword: [
                '',
                [
                    Validators.pattern(
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    ),
                ],
            ],
        });

        this.getUsersInfo();
    }

    /* This function fetches a ceratin users info and assigns it to the form fields so that they display in the input boxes
      when the form is loaded
  getUsersInfo() {
    this.service.getAccountData().subscribe((res: any) => {
      this.userInfo = res;
      console.log('userInfo:', this.userInfo);
      // Set initial form values using patchValue
      this.basicInfoForm.patchValue({
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        cellphoneNumber: this.userInfo.cellphoneNumber,
        email: this.userInfo.email,
        idNo:this.userInfo.idNo,
        accountNo: this.userInfo.accounts[0].accountNo,

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

    // Method to handle image selection - Thilivhali Ravhutulu 30/08/2023
    onImageSelect(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.selectedImageFile = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Method to convert File to URL - Thilivhali Ravhutulu 30/08/2023
    getImageUrl(file: File): string {
        return URL.createObjectURL(file);
    }

    onImageInputChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedImageFile = file;
        }
    }

    /* This function fetches and stores form values when the form is submitted and then calls and http post method,
    to update stored values, passing in the stored values
        2023/08/15*/

    updateUserInfo() {
        if (this.basicInfoForm.valid) {
            const updatedInfo: User = {
                // Populate text fields
                firstName: this.basicInfoForm.get('firstName')?.value,
                lastName: this.basicInfoForm.get('lastName')?.value,
                cellphoneNumber:
                    this.basicInfoForm.get('cellphoneNumber')?.value,
                email: this.basicInfoForm.get('email')?.value,
                idNo: this.basicInfoForm.get('idNo')?.value,
                accountNo: this.basicInfoForm.get('accountNo')?.value,
                // Include the selected image file - Thilivhali Ravhutulu 30/08/2023
                profileImage: this.selectedImageFile,
            };

            // Call the service method with the UserData object
            this.service
                .updateUser(this.userId, updatedInfo)
                .subscribe((res: any) => {
                    this.authService.successfulUpdate();
                    console.log('User info updated:', res);
                });
        }
    }
}
