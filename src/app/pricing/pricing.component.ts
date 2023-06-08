import { Component } from '@angular/core';

declare var grecaptcha: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  show_verf=false;

  isMonthlySelected=true
  isAnnuallySelected=false
  price1="$12.95"
  price2="$24.95"
  price3="$49.95"
  text="/month"
  close(){
    this.show_verf= !this.show_verf
  }


  selectMonthly() {
    this.isMonthlySelected = true;
    this.isAnnuallySelected = false;
    this.price1="$12.95"
    this.price2="$24.95"
    this.price3="$49.95"
    this.text="/month"
  }
  
  selectAnnually() {
    this.isMonthlySelected = false;
    this.isAnnuallySelected = true;
    this.price1="$155.40"
    this.price2="$299.40"
    this.price3="$299.40"
    this.text="/year"
  }

  email= '';
  password="";
  check_email=true
  check_error=false
  pasword='Password is required.'
  emaail='Email is required.'
  checkpassword=false;
  showPassword=false;
  isLoading=false;
  capatcha=true

  handleSuccess(){
    this.capatcha=false
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }
  onSubmit(){}
  

}
