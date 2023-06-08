import { Component } from '@angular/core';
import { Notif_Interface } from './Notif_Interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { CompanyOverviewComponent } from '../company/company-overview/company-overview.component';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent {
constructor(private http : HttpClient,private constants:ConstantsService,private router: Router,private token :TokenService, private company: CompanyOverviewComponent){}
notifications:Notif_Interface[]=[];
userId?:String
totalitems=0
currentPage=1

async getNotifications(){
  const url = this.router.url;
  if (url.includes('/s/seller')) {
    await this.getCompany()
  } else{
    this.userId = this.token.getUser()
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  interface MyResponse{
    totalItems:number;
    notifications:Notif_Interface[];
  }
  this.http.get<MyResponse>(this.constants.ServerIp+"/notifications/"+this.userId+"/"+this.currentPage,httpOptions).subscribe(response =>{
   this.notifications=this.notifications.concat(response.notifications)
   console.log(response.notifications)
    this.totalitems=response.totalItems
  },error =>{
  }
  )
}
async clickNotifications(x:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  this.http.get<Notif_Interface[]>(this.constants.ServerIp+"/notifications/click/"+x,httpOptions)
}
showMore(){
  this.currentPage +=1
 this.getNotifications()
}

async getCompany() {
  while (!this.company.company) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  this.userId = this.company.company.companyId
}
ngOnInit() {
  this.getNotifications()
  
}


}
