import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../utils/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {Role} from 'src/app/entity/Role'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  name:String;
  Nrole:Role;
  constructor(
    private myRoute: Router,
    public auth: AuthService,
    private apiService: ApiService) { 
      console.log(auth.isLoggedIn())
  }

  ngOnInit(): void {
    console.log(this.auth.decodeJWT().email)
    if(this.auth.isLoggedIn()){
       this.apiService
      .cekUser(this.auth.decodeJWT().email)
      .subscribe((Nrole) => {
        if(Nrole.role=="app"){
          this.myRoute.navigate(["/"]);
        }
        else if(Nrole.role=="docust"){
          this.myRoute.navigate(["/docustRecive"]);  
        }
        else {
          this.myRoute.navigate(["/archiveRecive"]);  
        }
      // console.log("dd",Nrole)
      })
    }
    // if(this.auth.isLoggedIn()=="user"){
      // this.apiService
      // .cekUser(this.email)
      // .subscribe((Nrole) => {
      //   console.log("dd",this.Nrole.role)
      // this.myRoute.navigate(["/"]);
      // })
    // }
  }

  doLogin(){
    this.apiService
    .postAuth(this.email, this.password)
    .subscribe(({data}: any) => {
      // if(data=""){
      this.auth.sendToken(data);
      this.apiService
      .cekUser(this.auth.decodeJWT().email)
      .subscribe((Nrole) => {
        if(Nrole.role=="app"){
          this.myRoute.navigate(["/"]); 
        }
        else if(Nrole.role=="docust"){ 
          this.myRoute.navigate(["/docustRecive"]);
        }
        else {
          this.myRoute.navigate(["/archiveRecive"]);  
        }
      // console.log("dd",Nrole)
      })
    // }
  })
  }
}
