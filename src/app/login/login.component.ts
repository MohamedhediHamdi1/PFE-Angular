import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../Services/constants.service';
import { TokenService } from '../Services/token.service';

declare var grecaptcha: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,private http: HttpClient,private token:TokenService,private constants: ConstantsService) { }


  email= '';
  password="";
  check_email=true
  check_error=false
  pasword='Password is required.'
  emaail='Email is required.'
  checkpassword=false;
  showPassword=false;
  Remember_Me=false;
  isLoading=true;
  capatcha=true

  handleSuccess(){
    this.capatcha=false
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }

  


  remeberMe(){
    this.Remember_Me = !this.Remember_Me;
  }

  check_password(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if(this.password.length<1){
      this.checkpassword=true;
      this.pasword='Password is required.'
    }
    else if (!passwordRegex.test(this.password) && this.password.length>0) {
      this.checkpassword=true;
      this.pasword='      Password is invalid.'
      alert("Password Must include at least one uppercase letter (A), one lowercase letter (a), one number (1), and one special character (&). Must have a minimum length of 8 characters.");

    } else {
      this.checkpassword=false;
      this.pasword=""
    }
  }

  isValidEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(this.email.length<1){
      this.emaail='Email is required.'
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
 
 
 


  async onSubmit() {
    interface MyResponse{
      userId:string;
      token:string;
      message:string;
    }
    this.isLoading=true
    this.check_error=true
    this.isValidEmail()
    this.check_password()
    if (!this.checkpassword && !this.check_email ){
      this.http.post<MyResponse>(this.constants.ServerIp+'/users/login', {"email":this.email,"password":this.password})
      .subscribe(response => {
          this.token.setEmail(this.email)
          this.token.setToken(response.token)
          this.token.setUser(response.userId)
        if(!this.Remember_Me){
          localStorage.setItem("RemeberMe","1")
        }
        this.router.navigateByUrl('s');
        this.isLoading=false
      }, error => {
        alert(error.error.message)
        this.isLoading=false
      });
    }
    else{
      this.isLoading=false
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.reloadCaptcha()
  }

  isLogin=false
  async ngOnInit() {
    this.isLogin= await this.token.checkUser()
    this.isLoading=false
    if(this.isLogin){
      this.router.navigateByUrl("/s")
    }
  }

}
