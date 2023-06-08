import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { AdminComponent } from '../admin/admin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

constructor(private http:HttpClient,private constants:ConstantsService,private adminComponent:AdminComponent,private router:Router){}

isLoading=false
admin=''
password=''

login(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  if(this.admin.length>4 && this.password.length>10){
    this.isLoading=true
    this.http.post(this.constants.ServerIp+'/admin/login',{'request':this.admin,'response':this.password},httpOptions).subscribe(
      response =>{
      this.adminComponent.isLogin=true
      this.isLoading=false
      sessionStorage.setItem('f',this.admin)
      this.router.navigate(['admin/DashBoard'])
      },
      error =>{
        this.isLoading=false
        this.adminComponent.isLogin=false
        alert("Incorrect Password")
      }
    )
  }
}

}
