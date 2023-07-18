import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStep = 0;
  private data: any = {};

  setCurrentStep(step: number) {
    this.currentStep = step;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  setData(dataKey: string, data: any) {
    this.data[dataKey] = data;
  }

  getData(dataKey: string): any {
    return this.data[dataKey];
  }
}