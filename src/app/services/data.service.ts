import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData: any = {}; // Initialize with an empty object

  setUserData(data: any) {
    this.userData = { ...this.userData, ...data };
  }

  getUserData() {
    return this.userData;
  }

  clearUserData() {
    this.userData = {};
  }

  
}
