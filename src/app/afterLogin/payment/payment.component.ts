import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServiceInterface } from '../details/ServiceInterface';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
constructor(private http : HttpClient,private constants:ConstantsService,private route: ActivatedRoute,private token :TokenService,private router:Router){}

  card_number = ''
  expiration_date = ''
  Security_code=''
  firstName=''
  lastName=''
  creditCard=true
  paypal=false
  serviceId=''
  service?:ServiceInterface
  imageUrl=''
  isLoading=true

  formatCardNumber() {
    let strippedNumber = this.card_number.replace(/[^0-9]/g, '');
    let groups = strippedNumber.match(/.{1,4}/g);
    this.card_number = groups ? groups.join(' ') : '';
  }
  formatSecurity_code():boolean {
    let strippedNumber = this.Security_code.replace(/[^0-9]/g, '');
    if(strippedNumber.length==3){
      return true
    }
    return false
  }

  isValidCreditCardNumber(cardNumber: string): boolean {
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const amexRegex = /^3[47][0-9]{13}$/;
    cardNumber = cardNumber.replace(/\D/g, '');
    if (!mastercardRegex.test(cardNumber) && !visaRegex.test(cardNumber) && !amexRegex.test(cardNumber)) {
      return false;
    }
    let sum = 0;
    let isSecondDigit = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (isSecondDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isSecondDigit = !isSecondDigit;
    }
    return sum % 10 == 0;
  }


  formatExpirationDate() {
    const inputPattern = /(\d{2})(\d{2})/;
    const matches = this.expiration_date.match(inputPattern);

    if (matches) {
      this.expiration_date = `${matches[1]}/${matches[2]}`;
    } else {
      this.expiration_date = '';
    }
  }
  isValidExpirationDate(expirationDate: string): boolean {
    // Check if the input string matches the format "MM/YY"
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (regex.test(expirationDate)) {
      // Extract the month and year from the input string
      const [month, year] = expirationDate.split('/').map(Number);
  
      // Check if the year is valid (between the current year and 20 years from now)
      const currentYear = new Date().getFullYear()-2000;
      const maxYear = currentYear + 20;
      if (year < currentYear || year > maxYear) {
        return false;
      }
      const currentMounth = new Date().getMonth()+1;
      console.log(currentMounth)
      if(year==currentYear){
        if(currentMounth>=month){
          return false;
        }
      }
      // Check if the month is valid (between 1 and 12)
      if (month < 1 || month > 12) {
        return false;
      }
  
      // Return true if the input string is a valid expiration date
      return true;
    }
  
    // Return false if the input string is not in the expected format
    return false;
  }
  

  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.serviceId = params['paymentid'];
    });
    if(this.serviceId.length!=32){
      this.router.navigateByUrl('s')
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<ServiceInterface>(this.constants.ServerIp+"/services/"+this.serviceId,httpOptions).subscribe(response =>{
      this.service=response
      this.imageUrl=this.constants.ServerIp+'/images/'+this.service.image
      this.isLoading=false
    },error =>{
      this.router.navigateByUrl('s')
    }
    )
  }

  createOrder(){
    this.isLoading=true
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    interface MyResponse{
      response:string
    }
    this.http.post<MyResponse>(this.constants.ServerIp+"/orders/"+this.token.getUser()+"/"+this.serviceId,{},httpOptions).subscribe(
      response =>{
        if(response.response==="done"){
          this.router.navigateByUrl('s/orders')
        }
    },error =>{
      this.isLoading=false
    }
    )
  }

}
