import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { userInterface } from 'src/app/afterLogin/services/userInterface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService){}

usersList:userInterface[]=[]
user?:userInterface;
page=1;
search=""
totalItems=0;
select="FirstName"
update=""
reason=""
showEdit=false
showBlockUser=false


editUser(){
  if(this.update.length>1){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.http.post(this.constants.ServerIp+'/admin/users/'+this.user?.userId,{'request':this.select,'response':this.update},httpOptions)
  .subscribe(response=>{
    alert('updated successfully')
  },
  error=>{
    alert('Error')
  }
  )
}
}

blockUser(){
  if(this.reason.length>19){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.http.put(this.constants.ServerIp+'/admin/users/'+this.user?.userId,{'request':'block','response':this.reason},httpOptions)
  .subscribe(response=>{
    this.showBlockUser=false
    this.showEdit=false
    alert('User Blocked successfully')
  },
  error=>{
    this.showBlockUser=false
    this.showEdit=false
    alert('Error')
  }
  )
}
}

unblockUser(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.http.put(this.constants.ServerIp+'/admin/users/'+this.user?.userId,{'request':'unblock'},httpOptions)
  .subscribe(response=>{
    this.showBlockUser=false
    this.showEdit=false
    alert('User Unblocked successfully')
  },
  error=>{
    this.showBlockUser=false
    this.showEdit=false
    alert('Error')
  }
  )
}


showEditUser(index:number){
  this.user=this.usersList[index]
  this.showEdit=true
}

getUsers(){
  var x='';
  if(this.search==='' || this.search===null || this.search===undefined){
    x='*'
  }else{
    x=this.search
  }

   
  interface Myresponse{
    totalItems:number;
    list:userInterface[];
  }
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.http.get<Myresponse>(this.constants.ServerIp+'/admin/users/'+this.page+'/'+x,httpOptions).subscribe(
    response =>{
      this.usersList=response.list
      this.totalItems=response.totalItems
    }
  )
}

onPageChange(page: number): void {
  this.page = page;
  this.getUsers()
}

ngOnInit(){
  this.getUsers()
}

}
