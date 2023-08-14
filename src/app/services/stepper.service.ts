import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStep = 0;
  private registrationData: any = {};

  constructor(private http: HttpClient, private userService: UserService) {}

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  setData(dataKey: string, data: any) {
    this.registrationData[dataKey] = data;
  }

  saveRegistrationData() {
    this.http.post(`${environment.apiUrl}/register`, this.registrationData).subscribe(
      (response) => {
        console.log('Registration data saved:', response);
      },
      (error) => {
        console.error('Error saving registration data:', error);
      }
    );
  }
  

  getRegistrationData() {
    return this.http.get(`${environment.apiUrl}/register`);
  }
}
