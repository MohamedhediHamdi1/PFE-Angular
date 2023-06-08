import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { Order_Interface } from './OrderInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-orders',
  templateUrl: './company-orders.component.html',
  styleUrls: ['./company-orders.component.scss']
})
export class CompanyOrdersComponent {

  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService, private company: CompanyOverviewComponent,private router:Router) { }

  manage_orders = "All orders"
  order_list:Order_Interface[]=[]
  orderList?:Order_Interface;
  curentPage=1
  satus="*"
  totalItems=0
  openOreder=false

 



  onChange(x: string) {
    this.manage_orders = x
    this.satus=x
    if(x.includes("All orders")){
      this.satus="*"
    }
    this.getOrders(true)
  }
  showmore(){
    this.curentPage +=1
    this.getOrders(false)
  }

  getOrders(type:boolean) {
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    }
    interface MyResponse{
      totalItems:number;
      orders:Order_Interface[];
    }
    this.http.get<MyResponse>(this.constants.ServerIp + "/orders/" + this.company.company?.companyId+"/"+this.curentPage+"/"+this.satus,httpOption)
    .subscribe(
      response => {
        this.totalItems=response.totalItems
        if(type){
          this.curentPage=1
          this.order_list=response.orders
        }else{
          this.order_list = this.order_list.concat(response.orders)
        }
      }
    )
  }
  getOrder(x:String) {
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    }
    this.http.get<Order_Interface>(this.constants.ServerIp + "/orders/order/" +x,httpOption)
    .subscribe(
      response => {
        this.orderList=response
        this.openOreder=true
      }
    )
  }
  close(){
    this.openOreder=false
    this.getOrders(true)
  }
  updateOrder(x:String) {
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    }
    interface MyResponse{
      response:String;
    }
    this.http.post<MyResponse>(this.constants.ServerIp + "/orders/" +this.orderList?.orderId,{"request":x},httpOption)
    .subscribe(
      response => {
        if(response.response.includes("done")){
          this.getOrder(this.orderList?.orderId!)
        }
      }
    )
  }
  async getCompany() {
    while (!this.company.company) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    if(this.company.company.verified==false){
      console.log('not verified')
       this.router.navigateByUrl("/s/seller/under_review")
      }
  }

  getStars(rating: number): string[] {
    if(rating>5){
      rating=0
    }
    const roundedRating = Math.round(rating);
    const stars = [];
    for (let i = 0; i < roundedRating; i++) {
      stars.push('★');
    }
    for (let i = roundedRating; i < 5; i++) {
      stars.push('☆');
    }
    return stars;
  }

  async ngOnInit() {
    await this.getCompany()
    this.getOrders(true)
  }

}
