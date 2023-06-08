import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from '../Services/constants.service';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private http: HttpClient , private router: Router,private route: ActivatedRoute,private token:TokenService,private constants: ConstantsService){}

  title1=""
  title2=""
  title3=""
  title4=""
  desc1=""
  desc2=""
  desc3=""
  desc4=""

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async ngOnInit() {
    interface MyResponse {
      title1: string;
      title2: string;
      title3: string;
      title4: string;
      desc1 : string;
      desc2 : string;
      desc3 : string;
      desc4 : string;
    }
    this.http.post<MyResponse>(this.constants.ServerIp+'/homeui',{})
    .subscribe(
      (response) => {
        this.title1=response.title1
        this.title2=response.title2
        this.title3=response.title3
        this.title4=response.title4
        this.desc1=response.desc1
        this.desc2=response.desc2
        this.desc3=response.desc3
        this.desc4=response.desc4
      },
      (error) => {
        
      }
    );
    
  }

}
