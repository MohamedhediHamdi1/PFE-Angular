import { Component } from '@angular/core';
import { ServiceInterface } from '../details/ServiceInterface';
import { CompanyOverviewComponent } from '../company/company-overview/company-overview.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { ConstantsService } from 'src/app/Services/constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company_Intreface } from '../company/company-overview/CompanyInterface';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss']
})
export class CompanyNameComponent {

  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService,private company :CompanyOverviewComponent,private router:Router,private route: ActivatedRoute){}
  service_list?:ServiceInterface[];
  privateId=''
  company_list?:Company_Intreface
  message=false
  imageUrl=this.constants.ServerIp+'/images/'

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

  getCompanyServices(){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
     this.http.get<ServiceInterface[]>(this.constants.ServerIp+'/services/companyservice/'+this.privateId,httpOptions)
        .subscribe(async response  => {
         this.service_list=response
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
    this.http.get<Company_Intreface>(this.constants.ServerIp+"/company/company/"+this.privateId,httpOptions).subscribe(response =>{
      this.company_list=response
    },error =>{
      this.router.navigateByUrl('/s')
    }
    )
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.privateId = params['companyId'];
    });
    this.getCompany()
    this.getCompanyServices()
  }

  goToService(x:String){
    this.router.navigateByUrl('s/'+x)
  }

}
