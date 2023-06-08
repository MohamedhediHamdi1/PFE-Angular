import { Component } from '@angular/core';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { ConstantsService } from 'src/app/Services/constants.service';
import { Channel_Interface } from '../inbox/channel_interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/Services/token.service';
import { SharedInboxService } from '../../navbar1/shared-inbox.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-navbar',
  templateUrl: './company-navbar.component.html',
  styleUrls: ['./company-navbar.component.scss']
})
export class CompanyNavbarComponent {
  constructor(private company : CompanyOverviewComponent,private constants:ConstantsService,private http: HttpClient, private token: TokenService,private sharedInbox:SharedInboxService,private router: Router){}
  drawer=false
  imageUrl1=this.constants.ServerIp + "/images/"
  imageUrl=""
  displayName?:String
  messages=false
  notification=false
  newMessages=false
  newNotifications=false
  channels: Channel_Interface[]=[]
  image2="assets/user.png"
  image1="assets/user.png"
  userId=""
  totalItems=0
  currentPage=1

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
    this.router.navigate(['s/seller/inbox']);
  }
  showMore(){
    this.currentPage +=1
    this.getChannels()
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
        if (this.channels[0].senderId === this.userId) {
          this.image2 = this.imageUrl1 + this.channels![0].recieverimage
          this.image1 = this.imageUrl1 + this.channels![0].senderImage
          console.log(this.image2)
        } else {
          this.image1 = this.imageUrl1 + this.channels![0].recieverimage
          this.image2 = this.imageUrl1 + this.channels![0].senderImage
        }
        this.newNotifications=response.newNotifications
        this.newMessages=response.newMessages
      }, error => {

      });
      
  }
  getNewMessAndNotif(){
    this.newMessages=this.sharedInbox.getnewMessages()
    this.newNotifications=this.sharedInbox.getnewNotificatinos()
    this.sharedInbox.currentSearchResults.subscribe(result =>{this.newMessages=result})
    

  }

  toggleNotifications(){
    this.notification= !this.notification
    this.messages=false
  }
  toggledrawer() {
    this.drawer = !this.drawer ;
  }

  async getCompany(){
    while(!this.company.company){
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.userId=this.company.company?.companyId?.toString()!
    this.getNewMessAndNotif()
  }

  async ngOnInit(){
    await this.getCompany()
    this.imageUrl=this.constants.ServerIp+"/images/"+this.company.company?.logo
    this.displayName = this.company.company?.displayName
  }
}
