import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { Company_Intreface } from 'src/app/afterLogin/company/company-overview/CompanyInterface';
import { Admin_Company_Intreface } from './AdminCompanyInterface';

@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['./admin-companies.component.scss']
})
export class AdminCompaniesComponent {
  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService){}

  companyList:Admin_Company_Intreface[]=[]
  page=1;
  search=""
  totalItems=0;
  type="all"
  showEdit=false
  select='Name'
  update=''
  company?:Admin_Company_Intreface
  showBlockCompany=false
  reason=''


  editCompany(){
    if(this.update.length>1){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post(this.constants.ServerIp+'/admin/company/'+this.company?.companyId,{'request':this.select,'response':this.update},httpOptions)
      .subscribe(response=>{
        alert('updated successfully')
      },
      error=>{
        alert('Error')
      }
      )
    }
  }

  blockCompany(){
    if(this.reason.length>19){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put(this.constants.ServerIp+'/admin/company/'+this.company?.companyId,{'request':'block','response':this.reason},httpOptions)
      .subscribe(response=>{
        this.showBlockCompany=false
        this.showEdit=false
        alert('Company Blocked successfully')
      },
      error=>{
        this.showBlockCompany=false
        this.showEdit=false
        alert('Error')
      }
      )
    }
  }
  unblockCompany(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put(this.constants.ServerIp+'/admin/company/'+this.company?.companyId,{'request':'unblock'},httpOptions)
    .subscribe(response=>{
      this.showBlockCompany=false
      this.showEdit=false
      alert('Company Unblocked successfully')
    },
    error=>{
      this.showBlockCompany=false
      this.showEdit=false
      alert('Error')
    }
    )
  }

  showEditCompany(index:number){
    this.company=this.companyList[index]
    this.showEdit=true
  }
  
  getCompanies(){
    var x='';
    if(this.search==='' || this.search===null || this.search===undefined){
      x='*'
    }else{
      x=this.search
    }

    interface Myresponse{
      totalItems:number;
      list:Admin_Company_Intreface[];
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.http.get<Myresponse>(this.constants.ServerIp+'/admin/company/'+this.page+'/'+x+'/'+this.type,httpOptions).subscribe(
      response =>{
        this.companyList=response.list
        this.totalItems=response.totalItems
      }
    )
  }

  getCompaniesByType(x:string){
    this.type=x
    this.getCompanies()
  }
  
  
  onPageChange(page: number): void {
    this.page = page;
    this.getCompanies()
  }
  
  ngOnInit(){
    this.getCompanies()
  }
}
