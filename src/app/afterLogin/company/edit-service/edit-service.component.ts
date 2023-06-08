import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { ServiceInterface } from '../../details/ServiceInterface';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  constructor(private http : HttpClient,private constants:ConstantsService,private route: ActivatedRoute,private token :TokenService,private router:Router){}
isLoading=false
input_title=false
input_image=false
input_price=false
input_category=false
input_description=false
input_briefDescription=false
imageurl="assets/user.png"
price?:String
title?:String
category?:String
description?:String
briefDescription?:String
privateId=""
serviceList?:ServiceInterface

onContinue(){
  this.router.navigateByUrl('s/seller')
}

checkPrice():boolean{
  const x =parseInt(this.price?.toString()!)
  if((x>10000 || x<10) && this.price!.toString() !=''){
    return true
  }
  return false
}

uploadImage() {
  const url = this.constants.ServerIp + "/images";
  const headers = new HttpHeaders({
    'Authorization': `Bearer ` + this.token.getToken(),
    'Accept': 'application/json'
  });
  const formData = new FormData();
  formData.append('file', this.selectedFile!, this.selectedFile!.name);
  interface Myresponse {
    response: string;
  }
  this.http.post<Myresponse>(url, formData, { headers: headers }).subscribe(
    response => {
      this.updateService('image',response.response)
    }, error => {
      alert('Error uploading image')
    }
  )
}


updateService(x:String,y:String){
  this.route.params.subscribe(params => {
    this.privateId = params['serviceId'];
  });
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  interface MyResponse{
    response:String
  }
  this.http.post<MyResponse>(this.constants.ServerIp+"/services/edit/"+this.privateId,{'request':x,'response':y},httpOptions).subscribe(
    response =>{
   if(response.response.includes('done')){
    this.getService()
    this.input_title=false
    this.input_image=false
    this.input_price=false
    this.input_category=false
    this.input_description=false
    this.input_briefDescription=false
   }
  },error =>{
    alert('Error connecting to server')
  }
  )
}

getService(){
  this.route.params.subscribe(params => {
    this.privateId = params['serviceId'];
  });
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.getToken(),
      'Content-Type': 'application/json'
    })
  };
  this.http.get<ServiceInterface>(this.constants.ServerIp+"/services/"+this.privateId,httpOptions).subscribe(response =>{
    this.serviceList=response
    this.imageurl=this.constants.ServerIp+"/images/"+this.serviceList.image
    this.title =this.serviceList.name
    this.price = this.serviceList.price.toString()
    this.category =this.serviceList.category
    this.description =this.serviceList.description
    this.briefDescription =this.serviceList.more_description
    this.videoPlayer.nativeElement.src = this.constants.ServerIp+"/images/"+this.serviceList.video;
  },error =>{
  }
  )
}
onSave(x:String,y:String){
  if(x.includes('name')){
    y=this.title = this.title!.replace(/\s{2,}/g, " ").trim().replace(/\s$/, "");
    if(this.title?.length!>9 && this.title?.length!<51){
      this.updateService(x,y)
      console.log('updated')
    }
  }else if(x.includes('price')){
    if(!this.checkPrice()){
      this.updateService(x,y)
      console.log('updated')
    }
  }else if(x.includes('category')){
    if(this.category !='Category'){
      this.updateService(x,y)
      console.log('updated')
    }
  }else if(x.includes('description')){
    y=this.description = this.description!.replace(/\s{2,}/g, " ").trim().replace(/\s$/, "");
    if(this.description?.length!>99 && this.description?.length!<151){
      this.updateService(x,y)
      console.log('updated')
    }
  }else if(x.includes('more_descrption')){
    x='more_description'
    y=this.briefDescription = this.briefDescription!.replace(/\s{2,}/g, " ").trim().replace(/\s$/, "");
    if(this.briefDescription?.length!>299 && this.briefDescription?.length!<501){
      this.updateService(x,y)
      console.log('updated')
    }
  }
}


onEdit(x:String){
  if(x.includes('title')){
    this.input_title= !this.input_title
  }else if(x.includes('image')){
    this.imageurl=this.constants.ServerIp+"/images/"+this.serviceList?.image
    this.input_image= !this.input_image
  }else if(x.includes('price')){
    this.input_price= !this.input_price
  }else if(x.includes('category')){
    this.input_category= !this.input_category
  }else if(x.includes('description')){
    this.input_description= !this.input_description
  }else if(x.includes('briefDescription')){
    this.input_briefDescription= !this.input_briefDescription
  }
}

selectedFile?: File;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validFileSize = 2 * 1024 * 1024; // 2MB in bytes

    if (validImageTypes.includes(fileType)) {
      if (file.size <= validFileSize) {
        this.selectedFile = file;
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Set the imageUrl property to the data URL
          this.imageurl = reader.result as string;
          this.input_image=true
        };
      } else {
        alert('Please select an image file with a size less than or equal to 2MB.');
      }
    } else {
      alert('Please select a valid image file (JPEG, PNG, or GIF).');
    }
  }


  file?: File;
  videoUrl?: string;
  videoId='0';

  onVideoSelected(event: any): void {
    this.file = event.target.files[0];
    this.videoUrl = URL.createObjectURL(this.file!);
    this.videoPlayer.nativeElement.src = this.videoUrl;
  }



  async uploadVideo() {
    this.isLoading=true
    const url = this.constants.ServerIp + "/video";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.token.getToken(),
      'Accept': 'application/json'
    });
    const formData = new FormData();
    formData.append('file', this.file!, this.file!.name);
    interface Myresponse {
      response: string;
    }

    try {
      const response = await new Promise<Myresponse>((resolve, reject) => {
        this.http.post<Myresponse>(url, formData, { headers: headers }).subscribe(
          (response: Myresponse) => {
            resolve(response);
            this.updateService('video',response.response)
            this.file=undefined
            this.isLoading=false
            this.videoPlayer.nativeElement.src = this.constants.ServerIp+"/images/"+response.response;
          }, (error) => {
            reject(error);
            this.isLoading=false
            alert("Error uploading video")
          }
        );
      });

      this.videoId = response.response;
      console.log(this.videoId);
    } catch (error) {
      this.isLoading=false
      alert('Error Uploading Video')
    }
  }




  ngOnInit(){
    this.getService()
  }

}
