import { Component } from '@angular/core';
import { ServicesComponent } from '../services/services.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from 'src/app/Services/constants.service';
@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.scss']
})
export class AddreviewComponent {
constructor(private getUser:ServicesComponent,private router: Router,private token:TokenService,private http : HttpClient,private constants:ConstantsService,private route: ActivatedRoute){}
userName=""
image="assets/user.png"
rate=0
review=""
orderid=""
submission_succussful=false  


stars: string[] = this.getStars(0);

onStarClicked(index: number) {
  this.stars = this.getStars(index + 1);
  this.rate=index+1
}

getStars(rating?: number): string[] {
  const roundedRating = Math.round(rating!);
  const stars = [];
  for (let i = 0; i < roundedRating; i++) {
    stars.push('★');
  }
  for (let i = roundedRating; i < 5; i++) {
    stars.push('☆');
  }
  return stars;
}

onDone(){
  this.router.navigateByUrl('/s')
}

createReview(){
  if(this.rate<=5 && this.rate>=1 && this.review.length<301 && this.review.length>9){
  const httpOptions={
    headers:new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  }
  interface MyResponse{response:String}
  this.http.post<MyResponse>(this.constants.ServerIp+'/review',{
    'serviceId':this.orderid,
    'userId':this.token.getUser(),
    'rate':this.rate,
    'message':this.review
  },httpOptions).subscribe(response =>{
    if(response.response.includes('done')){
      this.submission_succussful=true
    }
  },
  error =>{
    alert('Error')
  })
}
}

async getusers() {
  while (!this.getUser.user) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  this.userName=this.getUser.user.firstname.toString()+" "+this.getUser.user.lastname.toString()
  this.image=this.constants.ServerIp + "/images/"+this.getUser.user.imageId
}

async ngOnInit(){
  this.route.params.subscribe(params => {
    this.orderid = params['id'];
  });
  console.log(this.orderid)
  await this.getusers()
  
}
}
