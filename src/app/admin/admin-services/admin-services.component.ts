import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServiceInterface } from 'src/app/afterLogin/details/ServiceInterface';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.scss']
})
export class AdminServicesComponent {

  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService) { }

  servicesList: ServiceInterface[] = []
  page = 1;
  search = ""
  totalItems = 0;
  showEdit=false
  service?:ServiceInterface
  update=''
  select='Name'


  editService(){
    if(this.update.length>1){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post(this.constants.ServerIp+'/admin/services/'+this.service?.privateId,{'request':this.select,'response':this.update},httpOptions)
      .subscribe(response=>{
        alert('updated successfully')
      },
      error=>{
        alert('Error')
      }
      )
    }
  }


  showEditService(index:number){
    this.service=this.servicesList[index]
    this.showEdit=true
  }

  getServices() {
    var x = '';
    if (this.search === '' || this.search === null || this.search === undefined) {
      x = '*'
    } else {
      x = this.search
    }

    interface Myresponse {
      totalItems: number;
      services: ServiceInterface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Myresponse>(this.constants.ServerIp + '/admin/services/' + this.page + '/' + x, httpOptions).subscribe(
      response => {
        console.log(response)
        this.servicesList = response.services
        this.totalItems = response.totalItems
      }
    )
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getServices()
  }

  ngOnInit() {
    this.getServices()
  }

}
