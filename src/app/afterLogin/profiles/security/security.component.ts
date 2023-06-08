import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {

  constructor(private http: HttpClient , private router: Router,private constants: ConstantsService,private token :TokenService){}
  showPassword=false
  show_hide="Show"
  password=""
  cpassword=""
  oldPassword=""
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    if(this.showPassword==false){
      this.show_hide="Show"
    }else{
      this.show_hide="Hide"
    }
  }

  check_password(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if(this.password.length<1){
     alert("Password is required.")
    }
    else if (!passwordRegex.test(this.password) && this.password.length>0) {
      alert("Password Must include at least one uppercase letter (A), one lowercase letter (a), one number (1), and one special character (&). Must have a minimum length of 8 characters.");
    }else if(passwordRegex.test(this.password)){
      this.check_cpassword()
    }
  }
  check_cpassword(){
    if(this.cpassword == this.password){
      this.setNEwPassword()
    }
    else{
      alert("Password not matching")
    }
  }
  setNEwPassword(){
    interface Myresponse{
      request:String;
      response:String;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Myresponse>(this.constants.ServerIp+"/ResetPassword/oldpassword/"+this.token.getUser(),{
      'request': this.oldPassword,
	    "response": this.password
    },httpOptions).subscribe(
      async response =>{
       if(response.response.includes("done")){
        alert("Password changed successfully!")
        this.oldPassword=""
        this.password=""
        this.cpassword=""
       }else if(response.response.includes("Invalid Password")){
        alert("Invalid password")
       }
      },
      error =>{

      }
    )
  }
  onChange(){
this.check_password()
  }

}
