import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ForgotPasswordData, ResetPasswordData } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }


   //modified on the 07-Sep-2023 Delphia Sekhukhune
   sendForgotPasswordEmail(data: ForgotPasswordData): Observable<any> {
    return this.http.post(`${environment.FORGOT_URL}`, data);
  }
 
    //modified on the 07-Sep-2023 Delphia Sekhukhune
  verifyOtpAndResetPassword(data: ResetPasswordData): Observable<any> {
    return this.http.post(`${environment.RESET_URL}`, data);
  }
}