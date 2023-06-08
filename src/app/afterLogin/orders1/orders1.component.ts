import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { Order_Interface } from '../company/company-orders/OrderInterface';

@Component({
  selector: 'app-orders1',
  templateUrl: './orders1.component.html',
  styleUrls: ['./orders1.component.scss']
})
export class Orders1Component {
  
  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService,private router:Router) { }

  manage_orders = "All orders"
  order_list:Order_Interface[]=[]
  orderList?:Order_Interface;
  curentPage=1
  satus="*"
  totalItems=0
  openOreder=false
  isLoading=true

 

  goToReview(){
    this.router.navigateByUrl('s/review/'+this.orderList?.orderId)
  }

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
    this.http.get<MyResponse>(this.constants.ServerIp + "/orders/" + this.token.getUser()+"/"+this.curentPage+"/"+this.satus,httpOption)
    .subscribe(
      response => {
        this.totalItems=response.totalItems
        if(type){
          this.curentPage=1
          this.order_list=response.orders
        }else{
          this.order_list = this.order_list.concat(response.orders)
        }
        this.isLoading=false
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
    this.getOrders(true)
  }
}
