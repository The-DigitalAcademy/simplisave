import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  generateOTP(): string {
    return Math.random().toString().substr(2, 6);
  }
}
