import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from 'src/app/services/otp.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email!: string;
  otp!: string;

  constructor(private reset: ResetPasswordService,  private router: Router, private otpService: OtpService){}

  resetPassword() {
    try {
      this.otp = this.otpService.generateOTP();
      this.successPopup(this.otp);
    } catch (error) {
      this.errorPopup();
    }
  }


  private successPopup(otp: string) {
    Swal.fire({
      icon: 'success',
      title: 'OTP Generated',
      iconColor: '#AF144B',
      text: `The OTP ${otp} has been generated.`,
      confirmButtonColor: '#AF144B'
    }).then(() => {
            // Navigate to the reset-password page - Thilivhali Ravhutulu  22 August 2023
            this.router.navigate(['/reset']);
           });
  }

  private errorPopup() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      iconColor: '#AF144B',
      confirmButtonColor: '#AF144B',
      text: 'An error occurred while generating the OTP.',
    });
  }

  // sendForgotPassword() {
  //   this.reset.sendForgotPasswordEmail(this.email).subscribe(
  //     () => {
  //       // Handle success (OTP sent) - Thilivhali Ravhutulu  22 August 2023
  //       Swal.fire({
  //         icon: 'success',
  //         iconColor: '#AF144B',
  //         text: 'OTP sent to email!',
  //         confirmButtonColor: '#AF144B'
  //     }).then(() => {
  //       // Navigate to the reset-password page - Thilivhali Ravhutulu  22 August 2023
  //       this.router.navigate(['/reset']);
  //      })
      
  //     },
  //     error => {
  //       console.log('error:', error);

  //       // Handle error - Thilivhali Ravhutulu  22 August 2023
  //       Swal.fire({
  //         icon: 'error',
  //         iconColor: '#AF144B',
  //         text: 'Could not find email',
  //         confirmButtonColor: '#AF144B'
  //     }); 
  //     }
  //   );
  // }



}
