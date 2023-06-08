import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServicesComponent } from '../../services/services.component';
import { Company_Intreface } from './CompanyInterface';
import { SharedInboxService } from '../../navbar1/shared-inbox.service';

@Component({
  selector: 'app-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent {
  constructor(private router:Router,private http: HttpClient, private constants: ConstantsService, private token: TokenService, private services: ServicesComponent, private route: ActivatedRoute,private sharedInbox:SharedInboxService) { }

  isLogin=false
  companyId?: String
  privateId=''
  company?:Company_Intreface

  async getUser() {
    while (!this.services.user) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return this.services.user;
  }

  getCompany(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Company_Intreface>(this.constants.ServerIp+"/company/"+this.token.getUser(),httpOptions).subscribe(response =>{
      this.company=response
      if(this.company.companyId?.length! <30 ){
        this.router.navigateByUrl("/s/start_selling/overview")
      }else if(this.company.verified==false){
        console.log('not verified')
         this.router.navigateByUrl("/s/seller/under_review")
        }
        this.sharedInbox.setnewMessages(response.message!)
        this.sharedInbox.updateSearchResults(response.message!)
        this.sharedInbox.setnewNotificatinos(response.notification!)
    },error =>{
      this.router.navigateByUrl("/s/start_selling/overview")
    }
    )
  }




  async ngOnInit(){
    this.isLogin= await this.token.checkUser()
    if(!this.isLogin){
      this.router.navigateByUrl("/")
    }else{
      this.getCompany()
    }
    
  }

}
