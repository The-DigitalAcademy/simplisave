import { Component } from '@angular/core';
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

  constructor(private reset : ResetPasswordService) {}

  resetPassword() {
    this.reset.verifyOtpAndResetPassword(this.email, this.otp, this.newPassword, this.confirmPassword).subscribe(
      () => {
        // Handle success (password reset) - Thilivhali Ravhutulu  22 August 2023
        Swal.fire({
          icon: 'success',
          iconColor: '#AF144B',
          text: 'Password has been successfully reset!',
          confirmButtonColor: '#AF144B'
      });
      },
      error => {
        // Handle error - Thilivhali Ravhutulu  22 August 2023
        Swal.fire({
          icon: 'error',
          iconColor: '#AF144B',
          text: 'Password reset failed!',
          confirmButtonColor: '#AF144B'
      });
      }
    );
  }

}
