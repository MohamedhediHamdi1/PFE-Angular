import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from '../Services/constants.service';

declare var grecaptcha: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private http: HttpClient,private constants: ConstantsService){}

  capatcha=true

  ngOnInit():void{
    this.scrollToTop()
  }

  handleSuccess(){
    this.capatcha=false
  }
  reloadCaptcha() {
    grecaptcha.reset();
    this.capatcha=true
  }
  scrollToTop() {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }

  contact = {
    email: '',
    subject: '',
    details: '',
    ipAddress:""
  };
  getPublicIpAddress() {
    this.http.get('https://api.ipify.org?format=json').subscribe((res: any) => {
      console.log('Public IP address:', res.ip);
      this.contact.ipAddress=res.ip
      this.send()
    });
  }
  send(){
    interface MyResponse {
      response: string;
      token:String;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/contact', {
      "email": this.contact.email,
      "subject": this.contact.subject,
      "detail": this.contact.details,
      "ipAddress": this.contact.ipAddress
    })
    .subscribe(
      (response) => {
       alert(response.response)
      },
      (error) => {
       
      }
    );
  }

  onSubmit()  {
    this.getPublicIpAddress()
    this.reloadCaptcha()
  }
}
