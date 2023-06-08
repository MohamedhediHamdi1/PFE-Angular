import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ConstantsService } from '../Services/constants.service';


declare var grecaptcha: any;


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent {
  @ViewChild('captchaRef', { static: true }) captchaRef!: ReCaptcha2Component;

 
  constructor(private http: HttpClient , private router: Router,private location: Location,private constants: ConstantsService){}



  check_email=false
  check_error=false
  emaail='Email is required.'
  email= '';
  error=false;
  error_res='';
  isLoading=false;
  capatcha=true
  



  handleSuccess(){
    this.capatcha=false
  }
  isValidEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.email.length<1){
      this.emaail='Email is invalid.'
      this.check_email=true;
    }
    else if(!emailRegex.test(this.email) && this.email.length>0){
      this.emaail='Email is invalid.'
      this.check_email=true;
    }
    else{
      this.check_email=false
      this.emaail=""
    }
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }
  handleReset(){
    console.log("reset")
  }
  

 

  onSubmit(){
    this.isLoading=true
    this.isValidEmail()
    interface MyResponse {
      response: string;
      token:String;
    }
    this.error=false
    if (!this.check_email){
    this.http.post<MyResponse>(this.constants.ServerIp+'/ResetPassword/email', {"email": this.email})
    .subscribe(
      (response) => {
        if(response.response.includes("verification Code sent to")){
          console.log(response.response);
          this.error=false
          this.router.navigate(['/verificationcode'], { queryParams: { email: this.email,token: response.token } });
          this.isLoading=false
        }
        else{
          this.error=true
          this.error_res=response.response
          this.isLoading=false
        }
      },
      (error) => {
        this.isLoading=false
      }
    );
    }else{
      this.isLoading=false
    }
    this.reloadCaptcha()
  }

}
