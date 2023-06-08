import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss']
})
export class AdminAnalyticsComponent {
  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService, private router: Router) { }

  users="0"
  companies="0"
  services="0"

  getanalytics(){
    
    interface Myresponse{
      users:string;
      companies:string;
      services:string;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.http.get<Myresponse>(this.constants.ServerIp+'/admin/analytics/',httpOptions).subscribe(
      response =>{
        this.users=response.users
        this.companies=response.companies
        this.services=response.services
      }
    )
  }


  navigateTo(x: string) {
    this.router.navigateByUrl('admin/DashBoard/' + x)
  }


  ngOnInit(){
    this.getanalytics()
  }
}
