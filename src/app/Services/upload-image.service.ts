import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

 
 
  constructor(private constants: ConstantsService ,private token :TokenService,private http: HttpClient) { }

 

 async onUpload(selectedFile:File) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + this.token.getToken(),
      })
    };
    interface Myresponse{
      response:String;
    }
      this.http.post<Myresponse>(this.constants.ServerIp + "/images", formData, httpOptions)
     .subscribe(
       res => {
         console.log(res.response);
         // Do something with the response
       },
       err => {
         console.log(err);
         // Handle the error
       }
     );
  }
}
