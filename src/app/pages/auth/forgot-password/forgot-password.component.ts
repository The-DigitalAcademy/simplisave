import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  showAlert() {
    Swal.fire({
      icon: 'success',
      iconColor: '#AF144B',
      text: 'Reset email sent!',
      confirmButtonColor: '#AF144B'
  });  }



}
