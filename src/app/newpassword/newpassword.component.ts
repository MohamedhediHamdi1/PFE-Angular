import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from '../Services/constants.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent {
  constructor(private http: HttpClient , private router: Router,private route: ActivatedRoute,private constants: ConstantsService){}
  
  check_error=false;
  confirm_password=false;
  checkpassword=false;
  showPassword=false;
  pasword='Password is required.'
  password=""
  cpassword=""
  email=""
  token=""
  error=""
  check_error1=false;
  isLoading=false;

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
  }
 

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
  check_password(){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if(this.password.length<1){
      this.checkpassword=true;
      this.pasword="Password is required."
    }
    else if (!passwordRegex.test(this.password) && this.password.length>0) {
      this.checkpassword=true;
      this.pasword="Your password does not meet the required criteria."
      alert("Password Must include at least one uppercase letter (A), one lowercase letter (a), one number (1), and one special character (&). Must have a minimum length of 8 characters.");

    } else {
      this.checkpassword=false;
      this.pasword=""
    }
  }
  check_cpassword(){
    if(this.cpassword == this.password){
      this.confirm_password=false;
    }
    else{
      this.confirm_password=true;
    }
  }

  
  onSubmit() {
    this.isLoading=true
    this.check_error=true;
    this.check_cpassword()
    this.check_password()
    interface MyResponse {
      response: string;
      token : String;
    }
    if ( !this.confirm_password && !this.checkpassword) { 
      console.log("http sent")
      this.http.post<MyResponse>(this.constants.ServerIp+'/ResetPassword/newpassword', {"email":this.email,"token2":this.token,"token1":this.password})
      .subscribe((response) => {
        if(response.response.includes("Password Updated!")){
          console.log('Password Updated!');
        this.router.navigate(['/login']); 
        this.check_error1=false
        alert("Password Updated!")
        this.isLoading=false
        }
        else{
          this.error=response.response
          this.check_error1=true
          this.isLoading=false
        }
      });
    } else {
      this.isLoading=false
    }
    
  }
}
