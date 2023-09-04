import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email!: string;

  constructor(private reset: ResetPasswordService,  private router: Router){}

  sendForgotPassword() {
    this.reset.sendForgotPasswordEmail(this.email).subscribe(
      () => {
        // Handle success (OTP sent) - Thilivhali Ravhutulu  22 August 2023
        Swal.fire({
          icon: 'success',
          iconColor: '#AF144B',
          text: 'OTP sent to email!',
          confirmButtonColor: '#AF144B'
      }).then(() => {
        // Navigate to the reset-password page - Thilivhali Ravhutulu  22 August 2023
        this.router.navigate(['/reset']);
       })
      
      },
      error => {
        // Handle error - Thilivhali Ravhutulu  22 August 2023
        Swal.fire({
          icon: 'error',
          iconColor: '#AF144B',
          text: 'Could not find email',
          confirmButtonColor: '#AF144B'
      }); 
      }
    );
  }



}
