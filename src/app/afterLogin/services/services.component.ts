import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { userInterface } from './userInterface';
import { SharedInboxService } from '../navbar1/shared-inbox.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  
  constructor( private router: Router,private token:TokenService,private http : HttpClient,private constants:ConstantsService,private sharedInbox:SharedInboxService){}
  isLogin=false
  user?:userInterface


  initUser(){
    this.user=undefined
  }

getUser(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  this.http.get<any>(this.constants.ServerIp+/users/+this.token.getUser(),httpOptions).subscribe(
    response => {
      this.user=response
      this.sharedInbox.setnewMessages(this.user?.message!)
      this.sharedInbox.setnewNotificatinos(this.user?.notification!)
      this.sharedInbox.updateSearchResults(this.user?.message!)
    }
  )
}


  async ngOnInit() {
    this.isLogin= await this.token.checkUser()
    if(!this.isLogin){
      this.router.navigateByUrl("/")
    }else{
      this.getUser()
    }
  }
}
