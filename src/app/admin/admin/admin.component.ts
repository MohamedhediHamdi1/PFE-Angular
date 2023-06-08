import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private router:Router){}
isLogin=false

ngOnInit(){
if(this.isLogin){
this.router.navigateByUrl('admin/DashBoard')
}else{
  this.router.navigateByUrl('admin/login')
}
}
}
