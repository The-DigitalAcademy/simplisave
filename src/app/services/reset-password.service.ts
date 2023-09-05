import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  //For sending otp to user's email - Thilivhali Ravhutulu  22 August 2023
  sendForgotPasswordEmail(email: string) {
   
    return this.http.post(`${environment.FORGOT_URL}`, { email });
  }

  //For resetting password - Thilivhali Ravhutulu  22 August 2023
  verifyOtpAndResetPassword(otp: string, newPassword: string, confirmPassword: string) {
    return this.http.post(`${environment.RESET_URL}`, { otp, newPassword, confirmPassword });
  }
}
