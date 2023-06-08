import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { SharedService } from '../SharedService/shared-service.service';
import { Serices_Interface } from './ServiceInterface';
import { PaginationService } from 'ngx-pagination';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  providers: [ServicesListComponent]
})
export class ServicesListComponent {

  isLoading=false
  search="*"
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalServices: number = 0;
  
  
  onPageChange(page: number): void {
    this.currentPage = page;
    sessionStorage.setItem('scrollPosition', "0");
    this.getSearchServices()
  }
  
  

  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService, private sharedService: SharedService,private paginationService: PaginationService,private router: Router,private route: ActivatedRoute,private location: Location){}
  imageUrl=this.constants.ServerIp+'/images/'
 service_list:Serices_Interface[]=[];
 hide=false



async getSearchServices( ){
  this.isLoading=true
  this.search=this.sharedService.search
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
   this.http.get<Myresponse>(this.constants.ServerIp+'/services/search/'+this.search+'/'+this.currentPage,httpOptions)
      .subscribe(async response  => {
        this.sharedService.updateTotalServices(response.totalItems)
        this.sharedService.currentTotalServices.subscribe(totalServices =>{
          this.totalServices=totalServices;
        })
        this.sharedService.updateSearchResults(response.services);
        this.sharedService.currentSearchResults.subscribe(searchResults => {
          this.service_list = searchResults; 
        });
        if(this.service_list.length==0){this.hide=true}
        this.isLoading=false
        this.getScrollPosition()
      }, error => {
        this.isLoading=false
      });
}

saveScrollposition(){
  const scrollPosition = window.scrollY;
  sessionStorage.setItem('scrollPosition', scrollPosition.toString());
  sessionStorage.setItem('page', this.currentPage.toString());
}
getScrollPosition(){
    const storedPosition = sessionStorage.getItem('scrollPosition');
    const scrollPosition = Number(storedPosition);
    console.log(scrollPosition)
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }, 200);
    

}






goToService(link:String){
  this.saveScrollposition()
  this.router.navigateByUrl("s/"+link)
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



 async ngOnInit(){
  this.currentPage= Number(sessionStorage.getItem('page') || 1);
  await this.getSearchServices()
 }

  

}
