import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  showMenu: boolean = false;
  drawer=false;
  translate = "English"
  onClick() {
    this.translate="English";
    this.showMenu = false;
  }
  onClick1() {
    this.translate="French";
    this.showMenu = false;
  }
  toggleMenu() {
    this.showMenu = !this.showMenu ;
  }
  toggleMenu1(show: boolean) {
    this.showMenu = false ;
  }
  toggledrawer() {
    this.drawer = true ;
  }
  toggledrawer1() {
    this.drawer = false ;
  }
  goToPricing() {
    this.router.navigate(['login', { outlets: { home: ['login'] } }]);

  }
}


