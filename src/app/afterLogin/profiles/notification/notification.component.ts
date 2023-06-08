import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService){}

  InboxMessages=true
  OrderMessages=true
  OrderUpdates=true
  RatingReminders=true
  BuyerBriefs=true

  saveChanges(){
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
    this.http.post<Myresponse>(this.constants.ServerIp+"/notification/"+this.token.getUser(),{
      'inboxMessages': this.InboxMessages,
      'orderMessages': this.OrderMessages,
      'orderUpdates': this.OrderUpdates,
      'ratingReminders': this.RatingReminders,
      'buyerBriefs': this.BuyerBriefs
    },httpOptions).subscribe(
      async response =>{
       if(response.response.includes("done")){
        alert('updated successfully!')
       }else{
        alert('error')
       }
      },
      error =>{

      }
    )
  }

  getNotification(){
    interface Myresponse{
      inboxMessages:boolean;
      orderMessages:boolean;
      orderUpdates:boolean;
      ratingReminders:boolean;
      buyerBriefs:boolean;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Myresponse>(this.constants.ServerIp+"/notification/"+this.token.getUser(),httpOptions).subscribe(
      async response =>{
      this.InboxMessages=response.inboxMessages
      this.OrderMessages=response.orderMessages
      this.OrderUpdates=response.orderUpdates
      this.RatingReminders=response.ratingReminders
      this.BuyerBriefs=response.buyerBriefs
      },
    )
  }

  ngOnInit(){
    this.getNotification()
  }

}
