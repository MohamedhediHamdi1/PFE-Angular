import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServiceInterface } from './ServiceInterface';
import { SendMessageComponent } from '../send-message/send-message.component';

@Injectable({
  providedIn: "root"
})


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
privateId=""
serviceList?:ServiceInterface
message=false
isLoading=true
videoUrl?:string


constructor(private http : HttpClient,private constants:ConstantsService,private route: ActivatedRoute,private token :TokenService,private router:Router){}

imageUrl=this.constants.ServerIp+'/images/'
ngOnInit(){
  this.route.params.subscribe(params => {
    this.privateId = params['ServiceId'];
  });
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  this.http.get<ServiceInterface>(this.constants.ServerIp+"/services/"+this.privateId,httpOptions).subscribe(response =>{
    this.serviceList=response
    this.videoUrl=this.constants.ServerIp+"/images/"+this.serviceList.video
    this.videoPlayer.nativeElement.src = this.videoUrl;
    this.isLoading=false
    this.scrollToTop()
  },error =>{
    this.router.navigateByUrl('s')
  }
  )
}
goToPayment(){
  this.router.navigateByUrl('s/payment/'+this.privateId)
}
goToCompany(){
  this.router.navigateByUrl('s/company/'+this.serviceList?.companyId)
}
scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

getStars(rating?: number): string[] {
  const roundedRating = Math.round(rating!);
  const stars = [];
  for (let i = 0; i < roundedRating; i++) {
    stars.push('★');
  }
  for (let i = roundedRating; i < 5; i++) {
    stars.push('☆');
  }
  return stars;
}

showMessage(){
  this.message= !this.message
}

}
