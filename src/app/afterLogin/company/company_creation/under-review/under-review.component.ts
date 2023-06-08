import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-under-review',
  templateUrl: './under-review.component.html',
  styleUrls: ['./under-review.component.scss']
})
export class UnderReviewComponent {
  constructor(private router:Router){}
  goBack(){
    this.router.navigateByUrl('/s')
  }

}
