import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) { }
  path = ''


  async ngAfterViewInit(): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000); // 1000 milliseconds = 1 second
    });
    const currentPath = this.router.url;
    const segments = currentPath.split('/');
    this.path = segments[segments.length - 1];
    console.log(this.path);
  }

}
