import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ReviewInterface } from './reviewInterface';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  star0:number=0;
  star1:number=0;
  star2:number=0;
  star3:number=0;
  star4:number=0;
  star5:number=0;
  rate=0
  reviewsOrder=true
  reviewList:ReviewInterface[]=[]
  currentPage=1
  totalItems=0
  serviceId=""
  seeMore=false;
  percentage: number = 20;
  showMenu=false
  dropDown="Most Relevant"
  type='s'

  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService,private route: ActivatedRoute,private router:Router){}

  getServiceId(){
    if(this.router.url.includes('/company/')){
      this.route.params.subscribe(params => {
        this.serviceId = params['companyId'];
        this.type='company'
      });
    }else{
      this.route.params.subscribe(params => {
        this.serviceId = params['ServiceId'];
        this.type='service'
      });
    }
      
  }

  see_More(){
    this.currentPage+=1
    this.getReviewsList()
  }

   getReviewsList(){
    interface Myresponse{
      totalItems:number;
      services:ReviewInterface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
     this.http.get<Myresponse>(this.constants.ServerIp+'/review/'+this.type+'/'+this.serviceId+"/"+this.currentPage+"/"+this.reviewsOrder,httpOptions)
        .subscribe( response  => {
          this.reviewList=this.reviewList.concat(response.services)
          this.totalItems=response.totalItems
          if(response.totalItems-this.currentPage*5>0 ){
            this.seeMore=true
          }else{
            this.seeMore=false
          }
          this.getReviewsRate()
        }, error => {
        });
  }

  

  getReviewsRate(){
    interface Myresponse{
      stars0:number;
      stars1:number;
      stars2:number;
      stars3:number;
      stars4:number;
      stars5:number;
      rate:number;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Myresponse>(this.constants.ServerIp+'/review/notes/'+this.type+'/'+this.serviceId,httpOptions)
        .subscribe( response  => {
          this.star0=response.stars0
          this.star1=response.stars1
          this.star2=response.stars2
          this.star3=response.stars3
          this.star4=response.stars4
          this.star5=response.stars5
          this.rate=response.rate
        });


  }

  dropDownClick(text:string){
    if(!this.dropDown.includes(text)){
      this.dropDown=text
      if(this.dropDown.includes("Most Recent")){
        this.reviewsOrder=false
      }else{
        this.reviewsOrder=true
      }
      this.currentPage=1
      this.reviewList=[]
      this.getReviewsList()
    }
    this.showMenu=false
  }
  toggleMenu(){
    this.showMenu = !this.showMenu
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


  ngOnInit(){
    this.getServiceId()
    this.getReviewsList()
  }

}
