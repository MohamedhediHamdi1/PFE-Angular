import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {

  /*constructor(private http: HttpClient) { }

  uploadVideo(file: File, cloudName: string, apiKey: string, apiSecret: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');
    formData.append('api_key', apiKey);
    formData.append('timestamp', (Date.now() / 1000).toString());
    formData.append('signature', this.getSignature());

    return this.http.post(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, formData).toPromise();
  }

  private generateSignature(params: string[], cloudName: string, apiSecret: string): string {
    const signatureParams = params.concat(apiSecret);
    const signatureString = signatureParams.join('');
    const signature = btoa(signatureString);
    return signature;
  }*/
  
}
