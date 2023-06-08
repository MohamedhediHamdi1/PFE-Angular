import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from './Services/constants.service';
import { TokenService } from './Services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin=false
  title = 'B2B';
  constructor(private http: HttpClient , private router: Router,private route: ActivatedRoute,private token:TokenService,private constants: ConstantsService){}


  @HostListener('window:unload', ['$event'])
onUnload(event: Event) {
  if(localStorage.getItem("RemeberMe")?.includes("1")){
    localStorage.setItem("u","0")
    localStorage.setItem("l","0")
    localStorage.setItem("n","0")
    localStorage.setItem("RemeberMe","0")
    localStorage.removeItem("RemeberMe")
  }
}

}
