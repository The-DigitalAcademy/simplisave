import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  // formData: any = {}; // You can replace 'any' with a proper interface or class

  step1Data: FormGroup | undefined;
  step2FormGroup: FormGroup = new FormGroup({});
  step4FormGroup: FormGroup = new FormGroup({});
  step6FormGroup: FormGroup = new FormGroup({});

  constructor() {}
}