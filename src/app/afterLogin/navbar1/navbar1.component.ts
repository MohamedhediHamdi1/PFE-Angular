import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServicesListComponent } from '../services-list/services-list.component';
import { ServicesComponent } from '../services/services.component';
import { SharedService } from '../SharedService/shared-service.service';
import { Channel_Interface } from '../company/inbox/channel_interface';
import { InboxComponent } from '../company/inbox/inbox.component';
import { SharedInboxService } from './shared-inbox.service';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';



@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.scss']
})
export class Navbar1Component {

  constructor(private router: Router,private list_s :ServicesListComponent, private sharedService: SharedService,private services:ServicesComponent,private constants: ConstantsService,private http: HttpClient, private token: TokenService,private sharedInbox:SharedInboxService,private notifications:NotificationBarComponent) { }

  showMenu: boolean = false;
  drawer=false;
  messages=false
  notification=false
  newMessages=false
  newNotifications=false
  search=""
  imageId="assets/user.png"
  image2="assets/user.png"
  image1="assets/user.png"
  userId=""
  imageUrl = this.constants.ServerIp + "/images/"
  channels: Channel_Interface[]=[]
  currentPage=1
  totalItems=0
  toggleNotifications(){
    this.notification= !this.notification
    this.messages=false
  }
  toggleMessages(){
    this.messages= !this.messages
    this.notification=false
    if(this.messages){
      this.channels=[]
      this.getChannels()
    }
    
  }

  goToInbox(x:string){
    this.sharedInbox.setCurrentChannel(x)
    this.router.navigate(['s/inbox']);
  }

  getChannels() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    interface MyResponse{
      newMessages:boolean;
      newNotifications:boolean;
      totalItems:number;
      channels:Channel_Interface[];
    }
    this.http.get<MyResponse>(this.constants.ServerIp + '/channelmessage/' + this.userId + '/1/*' , httpOptions)
      .subscribe(async response => {
        this.channels =this.channels!.concat(response.channels)
        this.totalItems=response.totalItems
        if(this.channels.length!=0){
        if (this.channels![0].senderId === this.userId) {
          this.image2 = this.imageUrl + this.channels![0].recieverimage
          this.image1 = this.imageUrl + this.channels![0].senderImage
        } else {
          this.image1 = this.imageUrl + this.channels![0].recieverimage
          this.image2 = this.imageUrl + this.channels![0].senderImage
        }
      }
      }, error => {

      });
      
  }
showMore(){
  this.currentPage +=1
  this.getChannels()
}


  navigateToselling() {
    //this.router.navigateByUrl('s/start_selling');
    this.router.navigateByUrl('s/seller');
  }

  
  getSearchServices(){
    if(this.search==""){
      this.search="*"
    }
    this.sharedService.search=this.search
    this.list_s.getSearchServices()
    if(this.search=="*"){
      this.search=""
    }
  }

 
  toggleMenu() {
    this.showMenu = !this.showMenu ;
  }
  toggleMenu1(show: boolean) {
    this.showMenu = false ;
  }
  toggledrawer() {
    this.drawer = true ;
  }
  toggledrawer1() {
    this.drawer = false ;
  }
  goToPricing() {
    this.router.navigate(['login', { outlets: { home: ['login'] } }]);

  }
  getNewMessAndNotif(){
    //this.newMessages=this.sharedInbox.getnewMessages()
    this.newNotifications=this.sharedInbox.getnewNotificatinos()
    this.sharedInbox.currentSearchResults.subscribe(result =>{this.newMessages=result})
  }
  async getUser() {
    while (!this.services.user) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
   this.getNewMessAndNotif()
    return this.services.user;
  }

  async ngOnInit(){
   await this.getUser()
   this.imageId=this.constants.ServerIp+"/images/"+this.services.user?.imageId
   this.userId=this.token.getUser()
  }

}
