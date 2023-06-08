import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private router : Router){}
  selectedContainer=1;
  onChanged(x:number,path:String){
    this.selectedContainer=x
    this.router.navigateByUrl('s/profile'+path)
  }
  logOut(){
    localStorage.setItem('u',"")
    localStorage.setItem('l',"")
    localStorage.setItem('n',"")
    this.router.navigateByUrl('')
  }

}
