import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordData } from 'src/app/interfaces/user';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private reset : ResetPasswordService, private router: Router) {}


  //modified on the 03-Sep-2023 Delhia Sekhukhune

  resetPassword() {
    const resetData: ResetPasswordData = {
      otp: this.otp,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
    };
 
    this.reset.verifyOtpAndResetPassword(resetData).subscribe(
      () => {
        // Handle success (password reset) - Thilivhali Ravhutulu 22 August 2023
        Swal.fire({
          icon: 'success',
          iconColor: '#AF144B',
          text: 'Password has been successfully reset!',
          confirmButtonColor: '#AF144B',
        }).then(() => {
          // Navigate to the login page
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        // Handle error - Thilivhali Ravhutulu 22 August 2023
        Swal.fire({
          icon: 'error',
          iconColor: '#AF144B',
          text: 'Password reset failed!',
          confirmButtonColor: '#AF144B',
        });
      }
    );
  }
 
}
// NOR WORKING
  // setData(dataKey: keyof User, data: any): void {
  //   this.registrationData[dataKey] = data;
  // }