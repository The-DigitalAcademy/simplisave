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

