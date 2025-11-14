import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: any = null;

  constructor() { }
login(fullname: string, email: string, password: string) {
  if (fullname&&email&& password) {
    this.loggedUser = { fullname };
    localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
    return true;
  }
  return false;
}

  getLoggedUser() {
    if (this.loggedUser) return this.loggedUser;

    const data = localStorage.getItem("loggedUser");
    return data ? JSON.parse(data) : null;
  }
  logout() {
       this.loggedUser = null;
    localStorage.removeItem("loggedUser");
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}

