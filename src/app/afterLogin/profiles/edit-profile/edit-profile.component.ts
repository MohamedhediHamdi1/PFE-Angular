import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { UploadImageService } from 'src/app/Services/upload-image.service';
import { ServicesComponent } from '../../services/services.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {

constructor(private http : HttpClient,private constants: ConstantsService ,private token :TokenService,private services:ServicesComponent){}

  isLoading=true
  edit1=false
  edit1_text="Edit"
  imageId? :String;
  input1? :String;
  changeImage="assets/add-image.png"
  onEdit1(){
    this.edit1= !this.edit1
    if(this.edit1){
      this.edit1_text="Cancel"
    }else{
      this.edit1_text="Edit"
      this.setUser()
    }
  }
  edit2=false
  edit2_text="Edit"
  input2? :String;
  onEdit2(){
    this.edit2= !this.edit2
    if(this.edit2){
      this.edit2_text="Cancel"
    }else{
      this.edit2_text="Edit"
      this.setUser()
    }
  }
  edit3=false
  edit3_text="Edit"
  input3? :String;
  onEdit3(){
    this.edit3= !this.edit3
    if(this.edit3){
      this.edit3_text="Cancel"
    }else{
      this.edit3_text="Edit"
      this.setUser()
    }
  }
  edit4=false
  edit4_text="Edit"
  input4? :String;
  onEdit4(){
    this.edit4= !this.edit4
    if(this.edit4){
      this.edit4_text="Cancel"
    }else{
      this.edit4_text="Edit"
      this.setUser()
    }
  }

  onSave1(email:String,input:String){
    interface Myresponse{
      request:String;
      response:String;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Myresponse>(this.constants.ServerIp+"/users/profile/"+this.token.getUser(),{
      'request': email,
	    "response": input
    },httpOptions).subscribe(
      async response =>{
        this.edit1=false
        this.edit2=false
        this.edit3=false
        this.edit4=false
        this.edit1_text="Edit"
        this.edit2_text="Edit"
        this.edit3_text="Edit"
        this.edit4_text="Edit"
        if(response.response.includes("done")){
          alert("Your "+email+" updated successfully.")
        }else{
          alert(response.response)
        }
        this.services.initUser()
        this.services.getUser()
        await this.getUser()
      },
      error =>{

      }
    )
  }



  async getUser() {
    while (!this.services.user) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.isLoading=false
    this.setUser()
    return this.services.user;
  }
  setUser(){
    this.input1 = this.services.user?.firstname
    this.input2 = this.services.user?.lastname
    this.input3 = this.services.user?.email
    this.input4 = this.services.user?.phone
    this.imageId=this.constants.ServerIp+"/images/"+this.services.user?.imageId
  }

  onMouseOver(){
    this.imageId="assets/add-image.png"
  }
  onMouseOut(){
    this.imageId=this.constants.ServerIp+"/images/"+this.services.user?.imageId
  }

  
   uploadImage(file: File){
    const url = this.constants.ServerIp + "/images";
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+ this.token.getToken(),
      'Accept': 'application/json'
    });
    const formData = new FormData();
    formData.append('file', file, file.name);
    interface Myresponse{
      response:String;
    }
    this.http.post<Myresponse>(url, formData, { headers: headers }).subscribe(
      response =>{
        this.onSave1("Image",response.response)
      }
      )
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
      this.uploadImage(this.selectedFile!);
    } else {
      alert('Please select an image file with a size less than or equal to 2MB.');
    }
  } else {
    alert('Please select a valid image file (JPEG, PNG, or GIF).');
  }
}

  

  async ngOnInit(){
    await this.getUser()
  }

}
