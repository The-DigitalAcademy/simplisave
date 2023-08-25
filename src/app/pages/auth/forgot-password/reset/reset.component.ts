import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { environment } from 'src/environments/environment';
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
  userId: number = 0; // Store the user ID here

  constructor(private reset : ResetPasswordService, private http: HttpClient) {}

  resetPassword() {

     // Call your backend API to reset the password
    const resetData = {
      userId: this.userId,
      otp: this.otp,
      newPassword: this.newPassword
    };

    // Adjust the API endpoint URL
    this.http.post(`${environment.apiUrl}`, resetData).subscribe(
      () => {
        console.log('Password reset successful');
      },
      (error) => {
        console.error('Password reset failed:', error);
      }
    );

    // this.reset.verifyOtpAndResetPassword(this.email, this.otp, this.newPassword, this.confirmPassword).subscribe(
    //   () => {
    //     // Handle success (password reset) - Thilivhali Ravhutulu  22 August 2023
    //     Swal.fire({
    //       icon: 'success',
    //       iconColor: '#AF144B',
    //       text: 'Password has been successfully reset!',
    //       confirmButtonColor: '#AF144B'
    //   });
    //   },
    //   error => {
    //     // Handle error - Thilivhali Ravhutulu  22 August 2023
    //     Swal.fire({
    //       icon: 'error',
    //       iconColor: '#AF144B',
    //       text: 'Password reset failed!',
    //       confirmButtonColor: '#AF144B'
    //   });
    //   }
    // );
  }

}
