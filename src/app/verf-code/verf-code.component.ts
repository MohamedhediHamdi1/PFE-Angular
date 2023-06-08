import { HttpClient } from '@angular/common/http';
import {  Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../Services/constants.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-verf-code',
  templateUrl: './verf-code.component.html',
  styleUrls: ['./verf-code.component.scss']
})
export class VerfCodeComponent implements OnInit {
  constructor(private http: HttpClient , private router: Router,private route: ActivatedRoute,private constants: ConstantsService){}

  check_email=true
  check_error=false
  emaail='Code must be 6-digits'
  error=false;
  error_res='';
  code=0
  email="";
  emaill="";
  token="";
  isLoading=false;

  capatcha=true

  handleSuccess(){
    this.capatcha=false
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }
  remainingTime = 180; 

  disable=false
  updateRemainingTime() {
    localStorage.setItem('remainingTime', this.remainingTime.toString()); // Save the remaining time in localStorage
    if (this.remainingTime <= 0) {
      this.disable=true
      // The verification code has expired
      // Perform any necessary actions here
    } else {
      this.remainingTime--;
      setTimeout(() => {
        this.updateRemainingTime();
      }, 1000);
    }
  }

  resend(){
    this.isLoading=true
    interface MyResponse {
      response: string;
      token:String;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/ResetPassword/email', {"email": this.email})
    .subscribe(
      (response) => {
        if(response.response.includes("verification Code sent to")){
          this.remainingTime = 180;
          localStorage.setItem('remainingTime', this.remainingTime.toString());
          this.updateRemainingTime();
          this.disable=false
          this.error=false
          this.isLoading=false
        }
        else{
          this.isLoading=false
          this.error_res=response.response
          this.error=true
        }
      },
      (error) => {
        this.isLoading=false
        this.error=false
      }
    );
  }
  
  

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];
    console.log(this.email,this.token)
    try {
      if(this.email.length<5 || this.token.length<30){
        this.router.navigateByUrl("")
      }
    } catch (error) {
      this.router.navigateByUrl("")
    }
    const storedTime = localStorage.getItem('remainingTime');
    if (storedTime) {
      this.remainingTime = parseInt(storedTime, 10);
    } else {
      this.remainingTime = 180; // If the remaining time is not in localStorage, set it to 3 minutes (180 seconds)
    }
    this.updateRemainingTime();
    
  }

  onSubmit(){
    this.isLoading=true
    this.check_error=false
    this.code=parseInt(this.emaill)
    console.log(this.code)
    if(this.code>99999 && this.code < 1000000 && this.code!=null){
      this.check_error=false
      console.log("true")
    }else{
      this.check_error=true
    }
    interface MyResponse {
      response: string;
      token : String;
    }
    if(this.check_error==false && this.disable==false){
    this.http.post<MyResponse>(this.constants.ServerIp+'/ResetPassword/code', {"email": this.email,"verificationCode": this.code,"token1":this.token})
    .subscribe(
      (response) => {
        if(response.response.includes("done")){
          this.error=false
          this.router.navigate(['/newpassword'], { queryParams: { email: this.email,token: response.token } });
          console.log("done")
          this.isLoading=false
        }
        else{
          this.error=true
          this.error_res=response.response
          this.isLoading=false
        }
      },
      (error) => {
        console.log('Request failed, status code: ' + error.status);
        this.isLoading=false
        this.error=false
      }
    );
    this.reloadCaptcha()
  }
  this.isLoading=false
  
}
}
