import { Component } from '@angular/core';
import { HelpInterface } from './HelpInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from 'src/app/Services/constants.service';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-help',
  templateUrl: './admin-help.component.html',
  styleUrls: ['./admin-help.component.scss']
})
export class AdminHelpComponent {
constructor(private http : HttpClient,private constants: ConstantsService ,private adminLogin:AdminLoginComponent,private router:Router){}

helpList:HelpInterface[]=[]
help?:HelpInterface
page=1
type="users"
admin="0"
showReplied=false



getHelps(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
this.http.get<HelpInterface[]>(this.constants.ServerIp+'/admin/contact/'+this.type+'/'+this.page,httpOptions).subscribe(
    response =>{
      this.helpList=response
    }
  )
}

getOneHelp(index:number){
  this.help=this.helpList[index]
  if(this.help.admin ==='0'){
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
this.http.post(this.constants.ServerIp+'/admin/contact/'+this.help!.id+'/'+this.admin,httpOptions).subscribe(
    response =>{
      this.getHelps()
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
  this.getHelps()
}

}
