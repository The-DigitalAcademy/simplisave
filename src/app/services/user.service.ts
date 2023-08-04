import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'userData';

  setUser(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.localStorageKey);
    if (userData) {
      return JSON.parse(userData) as User; 
    }
    return null;
  }

  clearUser() {
    localStorage.removeItem(this.localStorageKey);
  }
}
