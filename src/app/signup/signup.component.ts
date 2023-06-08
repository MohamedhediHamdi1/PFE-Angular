import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantsService } from '../Services/constants.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private http: HttpClient , private router: Router,private constants: ConstantsService){}
  @ViewChild('accountForm') accountForm!: NgForm;
  accountData: any = {
    password:""
  };
  check_error=false;
  confirm_password=false;
  check_country=false;
  checkpassword=false;
  showPassword=false;
  check_email=false;
  pasword='Password is required.'
  emaail='Email is required.'
  termsAgreed = false;
  isLoading=false;
  capatcha=true
  capatcha2=true
  disable=false
  remainingTime = 180; 
  emailcode=""
  phonecode=""
  error_res=""
  show_verfcode=false
  phone_check=false



  emailCodeError = false;
phoneCodeError = false;

phonecheck(){
  try {
    if(this.accountData.country=="Canada"){
      if(this.accountData.phone.toString().length == 10){
  
        this.phone_check=false
      }else{
        this.phone_check=true
        this.isLoading=false
      }
    }else if(this.accountData.country=="Tunisia"){
      if(this.accountData.phone.toString().length == 8){
        this.phone_check=false
      }else{
        this.phone_check=true
        this.isLoading=false
      }
    }
  } catch (error) {
        this.phone_check=true
        this.isLoading=false
    
  }
}

checkEmailCodeLength() {
  if(parseInt(this.emailcode)<100000 || parseInt(this.emailcode)>999999){
    this.emailCodeError=true
  }else{
    this.emailCodeError=false
  }
  
}



checkPhoneCodeLength() {
  if(parseInt(this.phonecode)<100000 || parseInt(this.phonecode)>999999){
    this.phoneCodeError=true
  }else{
    this.phoneCodeError=false
  }
}
updateRemainingTime() {
  localStorage.setItem('remainingTime', this.remainingTime.toString()); // Save the remaining time in localStorage
  if (this.remainingTime <= 0) {
    this.show_verfcode=false
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



  onSubmitcode(){
    console.log(!this.phoneCodeError ,!this.emailCodeError , !this.capatcha2 , this.disable)
    if(!this.phoneCodeError && !this.emailCodeError && !this.capatcha2 &&  !this.disable){
      this.isLoading=true
      this.checkcode()
      this.reloadCaptcha()
    }
  }

  handleSuccess(){
    this.capatcha=false
  }
  handleSuccess2(){
    this.capatcha2=false
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }
  async gettime(){
    interface MyResponse {
      response: string;
      token:number;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/emailphone/getemailphone', {"email": this.accountData.email,"phone": this.accountData.phone})
    .subscribe(
      (response) => {
        console.log("gettime response : "+response.response)
        if(response.response.includes("done")){
          console.log("time : "+response.token)
         this.remainingTime=response.token
         localStorage.setItem('remainingTime', this.remainingTime.toString());
         const storedTime = localStorage.getItem('remainingTime');
         if (storedTime) {
           this.remainingTime = parseInt(storedTime, 10);
         } 
         this.isLoading=false
        }else if(response.response.includes("Try after 24h.")){
          alert("You have exceeded the maximum number of signup attempts. Please wait for 24H  before trying again.")
        }
        else{
          this.show_verfcode=false
          console.log(response.response)
         this.isLoading=false
        }
      },
      (error) => {
        this.isLoading=false
      }
    );
  }
  async checkemailphone(){
    interface MyResponse {
      response: string;
      token:number;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/emailphone/checkemailphone', {"email": this.accountData.email,"phone": this.accountData.phone})
    .subscribe(
      (response) => {
        if(response.response.includes("done")){
          console.log(response.response)
          this.sendcode()
        }else if(response.response.includes("Email already exist.") || response.response.includes("Phone already exist.")){
          alert(response.response)
          this.isLoading=false
        }else{
          console.log(response.response)
          this.isLoading=false
        }
      },
      (error) => {
        this.isLoading=false
      }
    );
  }
  async sendcode(){
    interface MyResponse {
      response: string;
      token:number;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/emailphone/sendcode', {"email": this.accountData.email,"phone": this.accountData.phone})
    .subscribe(
      (response) => {
        if(response.response.includes("done") || response.response.includes("Code Already sent.")){
          this.show_verfcode=true
          sessionStorage.setItem("show_verfcode","1")
          this.gettime()
        }
        else{
          this.isLoading=false
        }
      },
      (error) => {
        this.isLoading=false
      }
    );
  }
  async checkcode(){
    interface MyResponse {
      response: string;
      token:number;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/emailphone/checkcode', {"emailCode": this.emailcode,"phoneCode": this.phonecode,"email":this.accountData.email,"phone":this.accountData.phone})
    .subscribe(
      (response) => {
        if(response.response.includes("done")){
          sessionStorage.setItem("show_verfcode","0")
          this.createaccount()
          console.log(response.response)
        }else if(response.response.includes("Invalid code")){
          alert("Invalid code")
          this.isLoading=false
        }
        else{
          console.log(response.response)
          this.isLoading=false
        }
      },
      (error) => {
        this.isLoading=false
      }
    );
  }

  async createaccount(){
    this.http.post(this.constants.ServerIp+'/users', this.accountData)
      .subscribe((response) => {
        console.log('Account created:', response);
        this.router.navigate(['/login']); 
        alert("Account Created")
        this.isLoading=false
      },(error) => {
        console.log( error);
        this.isLoading=false
      }
      );
  }

  


  async ngOnInit(): Promise<void> {
    this.accountData.country="Select a country*";
    const check_verf = sessionStorage.getItem("show_verfcode")
    if(check_verf?.includes("1")){this.show_verfcode=true}
   
    const storedTime = localStorage.getItem('remainingTime');
    if (storedTime) {
      this.remainingTime = parseInt(storedTime, 10);
    } else {
      this.remainingTime = 180;
    }
    this.updateRemainingTime()
  }

  check_terms(){
    this.termsAgreed= !this.termsAgreed;
    console.log(this.termsAgreed)
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  check_contry(){
    if(this.accountData.country == "Tunisia" || this.accountData.country == "Canada"){
      this.check_country=false;
    }
    else{
      this.check_country=true;
    }
  }
  check_password(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if(this.accountData.password.length<1){
      this.checkpassword=true;
      this.pasword="Password is required."
    }
    else if (!passwordRegex.test(this.accountData.password) && this.accountData.password.length>0) {
      this.checkpassword=true;
      this.pasword="Your password does not meet the required criteria."
      alert("Password Must include at least one uppercase letter (A), one lowercase letter (a), one number (1), and one special character (&). Must have a minimum length of 8 characters.");

    } else {
      this.checkpassword=false;
      this.pasword=""
    }
  }
  check_cpassword(){
    if(this.accountData.cpassword == this.accountData.password){
      this.confirm_password=false;
    }
    else{
      this.confirm_password=true;
    }
  }
  isValidEmail(){

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.accountData.email.length<1){
      this.emaail='Email is required.'
      this.check_email=true;
    }
    else if(!emailRegex.test(this.accountData.email) && this.accountData.email.length>0){
      this.emaail='Email is invalid'
      this.check_email=true;
    }
    else{
      this.check_email=false
      this.emaail=""
    }
  }
  
  onSubmit() {
    this.isLoading=true
    this.check_error=true;
    try {
      
      this.check_cpassword()
    this.isValidEmail()
    this.check_contry()
    this.check_password()
    } catch (error) {
      this.isLoading=false
      this.reloadCaptcha()
    }
    this.phonecheck()
    if(this.accountData.country.includes("Canada") && this.accountData.phone.length>0){
      this.accountData.phone="+1"+this.accountData.phone
    }else{
      this.accountData.phone="+216"+this.accountData.phone
    }
    //this.accountData.phone="+1"+this.accountData.phone
    if (this.accountForm.valid && !this.check_country && !this.confirm_password && !this.checkpassword && !this.check_email && this.termsAgreed && !this.phone_check) { 
      console.log("http sent")
      this.checkemailphone();
    } else {
      this.isLoading=false
    }
    this.reloadCaptcha()
  }
   
}



