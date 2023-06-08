import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'ngx-pagination';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { DetailsComponent } from '../details/details.component';
import { Serices_Interface } from '../services-list/ServiceInterface';
import { SharedService } from '../SharedService/shared-service.service';

@Component({
  selector: 'app-recomondation',
  templateUrl: './recomondation.component.html',
  styleUrls: ['./recomondation.component.scss']
})
export class RecomondationComponent {
  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService,private router: Router,private route: ActivatedRoute,private detailsComponent:DetailsComponent){}

  isLoading=false
  search="*"
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalServices: number = 0;
  hide=false
  show_More=false
  ServiceId=""
  service_list:Serices_Interface[]=[];


  async getRecomandationServices(){
    this.route.params.subscribe(params => {
      this.ServiceId = params['ServiceId'];
    });
    this.isLoading=true
    interface Myresponse{
      totalItems:number;
      services:Serices_Interface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
     const catergory= await this.getCategory();
     this.http.get<Myresponse>(this.constants.ServerIp+'/services/recomandation/'+catergory+'/'+this.currentPage,httpOptions)
        .subscribe(response  => {
          this.service_list = this.service_list.concat(response.services.filter(service => service.privateId != this.ServiceId))
          //this.service_list = this.service_list.concat(response.services)
          if(response.totalItems-this.currentPage*4 >0 ){
            this.show_More=true
          }else{
            this.show_More=false
          }
          
          this.isLoading=false
        }, error => {
          this.isLoading=false
        });
  }

  showMore(){
    this.currentPage+=1
    this.getRecomandationServices()
  }





  async getCategory() {
    while (!this.detailsComponent.serviceList?.category) {
      // Wait until the category is available
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return this.detailsComponent.serviceList?.category;
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

  ngOnInit(){
    this.getRecomandationServices()
  }

}
