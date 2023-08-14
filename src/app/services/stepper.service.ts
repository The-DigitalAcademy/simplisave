import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStep = 0;
  private data: any = {};
  private registrationData: any = {};

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

   // Method to update data for each step - Thilivhali 14/08/2023
   updateStepData(data: any): void {
    this.registrationData = { ...this.registrationData, ...data };
  }

  setCurrentStep(step: number): void {
    this.currentStep = step;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  setData(dataKey: keyof User, data: any): void {
    this.registrationData[dataKey] = data;
  }
  setInfo(dataKey: string, data: any) {
        this.data[dataKey] = data;
      }

  saveRegistrationData(): void {
    this.http.post(`${environment.REG_URL}`, this.registrationData).subscribe(
      (response) => {
        console.log('Registration data saved:', response);
        Swal.fire({
          icon: 'success',
          text: 'Successful! Please Login',
          iconColor: '#AF144B',
          confirmButtonColor: '#AF144B'
        }).then(() => {
          // Navigate to the login page
          this.router.navigate(['/login']);
         })
      },
      (error) => {
        console.error('Error saving registration data:', error);
      }
    );
  }

  getRegistrationData(): Observable<User> {
    return this.http.get<User>(`${environment.REG_URL}`);
  }
}


