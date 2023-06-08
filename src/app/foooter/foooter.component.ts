import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foooter',
  templateUrl: './foooter.component.html',
  styleUrls: ['./foooter.component.scss']
})
export class FoooterComponent {

  constructor(private router: Router) {}
  
  Categories=false;
  Ressources=false;
  info=false;
  contact=false;
  clickContact(){
    this.router.navigate(['/contact']);
  }
  ngOnInit() {
    if (window.innerWidth < 1000) {
    this.Categories=false;
    this.Ressources=false;
    this.info=false;
    this.contact=false;
    }
    else{
      this.Categories=true;
    this.Ressources=true;
    this.info=true;
    this.contact=true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 1000) {
      this.Categories=false;
      this.Ressources=false;
      this.info=false;
      this.contact=false;
      }
      else{
        this.Categories=true;
      this.Ressources=true;
      this.info=true;
      this.contact=true;
      }
  }

  onclick(){
    if (window.innerWidth < 1000) {
    this.Categories = !this.Categories;
    this.Ressources=false;
    this.info=false;
    this.contact=false;
    }
  }
  onclick1(){
    if (window.innerWidth < 1000) {
    this.Ressources = !this.Ressources;
    this.info=false;
    this.contact=false;
    this.Categories=false;
    }
  }
  onclick2(){
    if (window.innerWidth < 1000) {
    this.info = !this.info;
    this.Categories=false;
    this.Ressources=false;
    this.contact=false;
    }
  }
  onclick3(){
    if (window.innerWidth < 1000) {
    this.contact = !this.contact;
    this.Categories=false;
    this.Ressources=false;
    this.info=false;
    }
  }

}
