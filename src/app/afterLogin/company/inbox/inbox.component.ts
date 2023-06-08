import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { Messages_Interface } from './messages_interface';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { Channel_Interface } from './channel_interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedInboxService } from '../../navbar1/shared-inbox.service';

@Injectable({
  providedIn: "root"
})


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {
  constructor(private route: ActivatedRoute,private http: HttpClient, private constants: ConstantsService, private token: TokenService, private company: CompanyOverviewComponent, private router: Router,private sharedInbox:SharedInboxService) {
    this.messages?.forEach(message => message.showDelete = false);
    
  }
  emojis: string[] = ['😀', '😂', '❤️', '👍', '👎', '😊', '😍', '🤩', '🤗', '🥰', '🤔', '😴', '🤯', '😱', '🤢', '🤮', '🤫', '🤭', '🙄', '😬', '🤥', '🤡']
  showEmojis = false;
  message_menu = false
  search = false
  delete_report = false
  message_input = ''
  recieverId = ''
  currentChannel=""
  channelsPage = 1
  messagePage = 1
  companyId?: String
  channelSelected?: Channel_Interface
  channels: Channel_Interface[]=[]
  messages?: Messages_Interface[];
  imageUrl = this.constants.ServerIp + "/images/"
  image1 = 'assets/user.png'
  image2 = 'assets/user.png'
  search_channels = ''
  senderName = ''
  isLoading=true


  showMore() {
    this.messagePage += 1
    this.getMessages()
  }
  back() {
    this.messagePage -= 1
    this.getMessages()
  }

  onRightClick(event: MouseEvent, index: number) {
    event.preventDefault();
    this.messages?.forEach(message => message.showDelete = false);
    this.messages![index].showDelete = !this.messages![index].showDelete;
  }
  leave() {
    this.messages?.forEach(message => message.showDelete = false);
  }
  toggleSerach() {
    this.search = !this.search
  }
  togleEmoji() {
    this.showEmojis = !this.showEmojis
  }
  addEmoji(emoji: string) {
    this.message_input = this.message_input.concat(emoji);
    this.showEmojis = false
  }
  messageMenu(x: boolean) {
    this.message_menu = x
  }
  getMessages() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Messages_Interface[]>(this.constants.ServerIp + '/messages/' + this.currentChannel + '/' + this.messagePage, httpOptions)
      .subscribe(async response => {
        this.messages = response
        if (this.channels![0].senderId?.includes(this.companyId?.toString()!)) {
          this.image2 = this.imageUrl + this.channels![0].recieverimage
          this.image1 = this.imageUrl + this.channels![0].senderImage
        } else {
          this.image1 = this.imageUrl + this.channels![0].recieverimage
          this.image2 = this.imageUrl + this.channels![0].senderImage
        }
        this.isLoading=false
      }, error => {
        this.isLoading=false
      });
  }
  deleteMessages(x: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.delete<Messages_Interface[]>(this.constants.ServerIp + '/messages/' + x + '/' + this.messagePage, httpOptions)
      .subscribe(async response => {
        this.messages = response
      }, error => {

      });
  }
  vueChannel(x: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    
    interface MyResponse {
      response: string;
      newMessages:boolean;
      newNotifications:boolean;
    }
    this.http.get<MyResponse>(this.constants.ServerIp + '/messages/vue/' + this.currentChannel + '/' + x+ '/' + this.companyId, httpOptions)
      .subscribe(async response => {
        if (response.response.includes('done')) {
          this.getChannels()
          console.log(response.newMessages,response.newNotifications)
          this.sharedInbox.updateSearchResults(response.newMessages)
          this.sharedInbox.setnewMessages(response.newMessages)
          this.sharedInbox.setnewNotificatinos(response.newNotifications)
        }
      }, error => {

      });
  }
  deleteChannel() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.delete<Channel_Interface[]>(this.constants.ServerIp + '/channelmessage/' + this.currentChannel + '/' + this.companyId + '/' + this.channelsPage, httpOptions)
      .subscribe(async response => {
        this.channels = response
        alert("Conversation Deleted")
      }, error => {

      });
  }
  reportMessages(x: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    interface MyResponse {
      response: string
    }
    this.http.get<MyResponse>(this.constants.ServerIp + '/messages/report/' + x + '/' + this.companyId, httpOptions)
      .subscribe(async response => {
        if (response.response === "done") {
          alert("Message Reported")
        }
      }, error => {

      });
  }
  sendMessages() {
    this.messagePage = 1
    if (this.message_input === 'Deleted') { this.message_input = '' }
    else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.token.getToken(),
          'Content-Type': 'application/json'
        })
      };
      this.http.post<Messages_Interface[]>(this.constants.ServerIp + '/messages' + '/' + this.messagePage, {
        "message": this.message_input,
        "senderId": this.companyId,
        "recieverId": this.recieverId
      }, httpOptions)
        .subscribe(async response => {
          this.messages = response
          this.message_input = ''
        }, error => {

        });
    }
  }
  getChannels() {
    this.isLoading=true
    if (this.search_channels === '' || this.search_channels === null) { this.search_channels = '*' }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    interface MyReponse{
      channels:Channel_Interface[]
    }
   
    this.http.get<MyReponse>(this.constants.ServerIp + '/channelmessage/' + this.companyId + '/' + this.channelsPage + '/' + this.search_channels, httpOptions)
      .subscribe(async response => {
        this.channels = response.channels
        if(this.sharedInbox.getCurrentChannel().length>30){
          this.currentChannel=this.sharedInbox.getCurrentChannel()
        }else{
          this.currentChannel = this.channels[0].channelId!
        }
        if (this.channels![0].senderId === this.companyId?.toString()) {
          this.image2 = this.imageUrl + this.channels![0].recieverimage
          this.image1 = this.imageUrl + this.channels![0].senderImage
        } else {
          this.image1 = this.imageUrl + this.channels![0].recieverimage
          this.image2 = this.imageUrl + this.channels![0].senderImage
        }
        this.channelSelected = this.channels![0]
        if (this.channelSelected.senderId!.includes(this.companyId!.toString())) {
          this.recieverId = this.channelSelected.recieverId!
        } else if (this.channelSelected.recieverId!.includes(this.companyId!.toString())) {
          this.recieverId = this.channelSelected.senderId!
        }
        this.getMessages()
      }, error => {
        this.isLoading=false
      });
    if (this.search_channels === '*') { this.search_channels = '' }
  }
  selectChannel(channelId: string, x: number) {
    this.currentChannel = channelId
    this.getMessages()
    this.channelSelected = this.channels![x]
    if (this.channelSelected.senderId!.includes(this.companyId!.toString())) {
      this.recieverId = this.channelSelected.recieverId!
    } else if (this.channelSelected.recieverId!.includes(this.companyId!.toString())) {
      this.recieverId = this.channelSelected.senderId!
    }
    if (this.channels![x].vue == false) {
      this.vueChannel('1')
    }
  }

  async getCompany() {
    while (!this.company.company) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    this.companyId = this.company.company.companyId
  }
  async ngOnInit() {
    const url = this.router.url;
    if (url === '/s/seller/inbox') {
      await this.getCompany()
    } else if (url === '/s/inbox') {
      this.companyId = this.token.getUser()
    }
    this.getChannels()
  }


}
