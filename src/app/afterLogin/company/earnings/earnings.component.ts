import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent {

  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService, private company: CompanyOverviewComponent,private router:Router) { }

  async getCompany() {
    while (!this.company.company) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    if(this.company.company.verified==false){
      console.log('not verified')
       this.router.navigateByUrl("/s/seller/under_review")
      }
  }
  ngOnInit(){
    this.getCompany()
  }

}
