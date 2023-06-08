import { Component } from '@angular/core';
import { CompanyUiComponent } from '../company-ui/company-ui.component';
import { AnalyticsInterface } from '../company-ui/AnalyticsInterface';
import { Serices_Interface } from '../../services-list/ServiceInterface';
import { ServiceInterface } from '../../details/ServiceInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  constructor(private dashboard: CompanyUiComponent,private router :Router) { }
  analytics_list?: AnalyticsInterface;
  service_list?: ServiceInterface[];


editService(x:String){
  this.router.navigateByUrl('s/seller/editservice/'+x)
}

  hideAndUnHide(x: boolean): String {
    if (x) {
      return 'Hide'
    } else {
      return 'UnHide'
    }
  }
  async onHide(x:String,y:String){
    this.dashboard.Onhide(x,y)
    this.dashboard.service_list=undefined
    await this.getServices()
    this.service_list = this.dashboard.service_list
  }
  

  async getAnalytics() {
    while (!this.dashboard.analytics_list) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  async getServices() {
    while (!this.dashboard.service_list) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  async ngOnInit() {
    await this.dashboard.getCompany()
    this.dashboard.getCompanyAnalytics()
    await this.getAnalytics()
    this.dashboard.getCompanyServices()
    this.dashboard.getCompanyServices()
    await this.getServices()
    this.analytics_list = this.dashboard.analytics_list
    this.service_list = this.dashboard.service_list

  }
}
