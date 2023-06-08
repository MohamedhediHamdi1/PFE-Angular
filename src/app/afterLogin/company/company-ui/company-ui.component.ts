import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { Serices_Interface } from '../../services-list/ServiceInterface';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { AnalyticsInterface } from './AnalyticsInterface';
import { ServiceInterface } from '../../details/ServiceInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-ui',
  templateUrl: './company-ui.component.html',
  styleUrls: ['./company-ui.component.scss']
})
export class CompanyUiComponent {
  service_list?:ServiceInterface[];
  imageUrl="assets/user.png"
  fullName?:String
  analytics_list?:AnalyticsInterface;

constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService,private company :CompanyOverviewComponent,private router:Router){}

hideAndUnHide(x: boolean): String {
  if (x) {
    return 'Hide'
  } else {
    return 'UnHide'
  }
}
Onhide(x:String,y:String){
  
  const httpOptions={
    headers:new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
    })
  }
  interface MyResponse{
    response:String
  }
  this.http.get<MyResponse>(this.constants.ServerIp+"/services/"+y+"/"+x,httpOptions).subscribe(
    response =>{
      if(response.response.includes('done')){
          this.service_list=[]
        this.getCompanyServices()
      }
    }
  )
}

  getStars(rating: number): string[] {
    const roundedRating = Math.round(rating);
    const stars = [];
    for (let i = 0; i < roundedRating; i++) {
      stars.push('★');
    }
    for (let i = roundedRating; i < 5; i++) {
      stars.push('☆');
    }
    return stars;
  }
  getCompanyAnalytics( ){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
     this.http.get<AnalyticsInterface>(this.constants.ServerIp+'/analytics/'+this.company.company?.companyId,httpOptions)
        .subscribe(async response  => {
         this.analytics_list=response
        }, error => {
        });
  }
  getCompanyServices(){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
     this.http.get<ServiceInterface[]>(this.constants.ServerIp+'/services/companyservice/'+this.company.company?.companyId,httpOptions)
        .subscribe(async response  => {
         this.service_list=response
        }, error => {
        });
  }

  async getCompany() {
    while (!this.company.company) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if(this.company.company.verified==false){
      console.log('not verified')
       this.router.navigateByUrl("/s/seller/under_review")
      }
    this.imageUrl=this.constants.ServerIp+"/images/"+this.company.company?.logo
    this.fullName = this.company.company?.fullName
  }
  hide(){
  }

  async ngOnInit(){
    await this.getCompany()
    this.getCompanyServices()
    await new Promise(resolve => setTimeout(resolve, 100));
    this.getCompanyAnalytics()
  }
}
