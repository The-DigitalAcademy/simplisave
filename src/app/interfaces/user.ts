import { Observable } from "rxjs";

export interface User {
    // interface for all data - Thilivhali Ravhutulu 07/08/2023
    firstName: string;
    lastName: string;
    email: string;
    cellphoneNumber: string;
    accountNo: string;
    idNo: string;
    profileImage: File | null;
}

export interface RegistrationData extends User {
    password: string;
    confirmPassword: string;
  }
  

// stepper.service.ts
export interface StepperServiceInterface {
    updateStepData(data: UserUpdateData): void;
    setCurrentStep(step: number): void;
    getCurrentStep(): number;
    setData(dataKey: keyof User, data: any): void;
    setInfo(dataKey: string, data: any): void;
    saveRegistrationData(): void;
    getRegistrationData(): Observable<User>;
  }
  
  export interface UserUpdateData {
    password: string;
  }

  //Added interface for forgot and reset password --> Delphia Sekhukhune 07-Sep-2023

  export interface ResetPasswordData {
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

 export interface ForgotPasswordData {
    email: string;
 }
