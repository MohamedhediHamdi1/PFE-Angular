import { Component, Injectable, Input } from '@angular/core';
import { DetailsComponent } from '../details/details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { ServicesComponent } from '../services/services.component';
import { Company_Intreface } from '../company/company-overview/CompanyInterface';
import { CompanyNameComponent } from '../company-name/company-name.component';




@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent {
  @Input() constantValue: string;
  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService,private servicedetail:DetailsComponent,private router:Router,private user:ServicesComponent,private companyName:CompanyNameComponent){
    this.constantValue = '';
  }
  message=''
  reciever=''
  image="assets/user.png"
  userName=''

  close(){
    this.servicedetail.message=false
    this.companyName.message=false
  }

  sendMessages() {
    console.log(this.token.getUser())
    console.log(this.constantValue)
    const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token.getToken(),
          'Content-Type': 'application/json'
        })
      };
      this.http.post(this.constants.ServerIp + '/messages' + '/1', {
        "message": this.message,
        "senderId": this.token.getUser(),
        "recieverId": this.constantValue
      }, httpOptions)
        .subscribe(async response => {
          this.router.navigateByUrl('s/inbox')
        }, error => {
        });
  }

  getCompany(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Company_Intreface>(this.constants.ServerIp+"/company/company/"+this.constantValue,httpOptions).subscribe(response =>{
      this.image=this.constants.ServerIp+'/images/'+response.logo
      this.userName=response.fullName!.toString()
    },error =>{
      
    }
    )
  }

ngOnInit(){
  this.getCompany()
}

}
