import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percent-line',
  templateUrl: './percent-line.component.html',
  styleUrls: ['./percent-line.component.scss']
})
export class PercentLineComponent {
  
  @Input() percent: number=20;

}
