import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: any) {
    localStorage.setItem("LoggedInUser", token)
  }

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }

  isLoggedIn() {
    // console.log("lol",this.getToken())
    return this.getToken();
  }
  
  decodeJWT(){
    if (this.getToken() !== null){

      console.log(JSON.parse(atob(this.getToken().split(".")[1])))
      return JSON.parse(atob(this.getToken().split(".")[1]))
    }
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    this.myRoute.navigate(["login"]);
  }
  
}