import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { ReportInterface } from './ReportInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent {
  constructor(private http: HttpClient, private constants: ConstantsService,private router:Router) { }

  reportList: ReportInterface[] = []
  report?: ReportInterface
  page = 1
  showReplied=false
  admin="0"


  getReports(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.http.get<ReportInterface[]>(this.constants.ServerIp+'/admin/contact/reports/'+this.page,httpOptions).subscribe(
      response =>{
        this.reportList=response
      }
    )
  }
  
  getOneReport(index:number){
    this.report=this.reportList[index]
    if(this.report.admin ==='0'){
      this.showReplied=true
    } 
  }
  
  done(){
    this.getAdmin()
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  this.http.post(this.constants.ServerIp+'/admin/contact/reports/'+this.report!.reportId+'/'+this.admin,httpOptions).subscribe(
      response =>{
        this.getReports()
        this.showReplied=false
        alert("Done")
        
      },error =>{
        alert("Error")
      }
    )
  
  
  }


  getAdmin(){
    try{
    this.admin=sessionStorage.getItem('f')!
    }catch(e){
      this.router.navigateByUrl('admin/login')
    }
    console.log(this.admin)
  }
  
  
  ngOnInit(){
    this.getReports()
  }
}
